function getToken(interactive=false){
  return new Promise((resolve,reject)=>{
    chrome.identity.getAuthToken({interactive},(token)=>{
      if(chrome.runtime.lastError || !token) return reject(chrome.runtime.lastError?.message || "No token");
      resolve(token);
    });
  });
}

async function listDriveFiles(token){
  const url = "https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType)";
  const resp = await fetch(url,{ headers:{ Authorization: `Bearer ${token}` }});
  if(!resp.ok) throw new Error("Drive API error: "+resp.status);
  const data = await resp.json();
  return data.files || [];
}

function show(view){
  document.getElementById("login").style.display = view==="login" ? "block" : "none";
  document.getElementById("content").style.display = view==="content" ? "block" : "none";
}

async function renderFiles(token){
  const listEl = document.getElementById("fileList");
  listEl.innerHTML = "<li class='muted'>Loading…</li>";
  try{
    const files = await listDriveFiles(token);
    listEl.innerHTML = "";
    if(files.length===0){ listEl.innerHTML="<li class='muted'>Tidak ada file.</li>"; return; }
    for(const f of files){
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href="#";
      a.textContent="⬇";
      a.style.marginRight="6px";
      a.addEventListener("click", async(e)=>{ e.preventDefault(); try{ const t = await getToken(false).catch(()=>getToken(true)); downloadFile(t,f.id,f.name); }catch(err){ alert("Gagal: "+err.message); }});
      li.appendChild(a);
      li.appendChild(document.createTextNode(`${f.name} — ${f.id} — ${f.mimeType}`));
      listEl.appendChild(li);
    }
  }catch(err){
    listEl.innerHTML = `<li class='muted'>Error: ${err.message}</li>`;
  }
}

async function downloadFile(token,fileId,fileName){
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`;
  const resp = await fetch(url,{ headers:{ Authorization: `Bearer ${token}` }});
  if(!resp.ok) throw new Error("Download error: "+resp.status);
  const blob = await resp.blob();
  const objectUrl = URL.createObjectURL(blob);
  chrome.downloads.download({ url: objectUrl, filename: fileName || "download.bin" }, ()=>{ URL.revokeObjectURL(objectUrl); });
}

function logout(){
  chrome.identity.getAuthToken({interactive:false},(token)=>{
    if(!token){ show("login"); return; }
    chrome.identity.removeCachedAuthToken({token},()=>{
      fetch(`https://oauth2.googleapis.com/revoke?token=${token}`,{ method:"POST", headers:{ "Content-type":"application/x-www-form-urlencoded" } })
      .finally(()=> show("login"));
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  (async()=>{
    try{ const token = await getToken(false); await renderFiles(token); show("content"); } catch { show("login"); }
  })();
  document.getElementById("btnSignIn").addEventListener("click", async()=>{ try{ const token = await getToken(true); await renderFiles(token); show("content"); }catch(e){ alert("Gagal login: "+e); }});
  document.getElementById("btnRefresh").addEventListener("click", async()=>{ try{ const token = await getToken(false); await renderFiles(token); }catch{ const token = await getToken(true); await renderFiles(token); }});
  document.getElementById("btnLogout").addEventListener("click", logout);
});
