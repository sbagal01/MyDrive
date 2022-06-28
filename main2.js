(function(){
    let btn=document.querySelector("#addNewFolder");
    let textbtn=document.querySelector("#addTextFile");
    let albumButton=document.querySelector("#addAlbumFile");
    let resources=[];
    let cfid=-1;
    let rid=0;

    let breadCrumb=document.querySelector("#breadCrumb");
    let templates=document.querySelector("#mytemplates");
    //let h1=document.querySelector("h1");
    let divContainer=document.querySelector("#divContainer");

    let close=document.querySelector("#close-app");

    let aRootpath=breadCrumb.querySelector("[purpose='path']");

    let divApp=document.querySelector("#app");
    let divAppTitleBar=document.querySelector("#app_title_bar");
    let divAppTitle=document.querySelector("#app_title");

    let divAppMenuBar=document.querySelector("#app_menu_bar");
    let divAppBody=document.querySelector("#app_body");

    btn.addEventListener("click",addFolder);
    textbtn.addEventListener("click",addTextFile);
    albumButton.addEventListener("click",addAlbum);
    aRootpath.addEventListener("click",viewFolderFromPath);
    close.addEventListener("click", closeApp);

    function closeApp(){
        //benefit of innerHTML .we can add button as well . but we can not do with text.content
        divAppTitle.innerHTML="Title will come here";
        divAppTitle.setAttribute("rid","");       
        divAppMenuBar.innerHTML="";
        divAppBody.innerHTML="";
    }

    function addAlbum(){
        let rname=prompt("Enter Album name");
        rname=rname.trim();
        if(!rname){
            //if we do not use return then it will still create a Folder with blank name.
            alert("name cannot be blank.Please enter a name");
            return;
        }
        rname=rname.trim();
        let exists=resources.some(f=>f.rname==rname && f.pid==cfid && f.rtype=="albumFile");
        
        if(exists){
            alert(rname+"already exists. Please enter a unique name");
            return;

        }


        rid++;
        let pid=cfid;
        addAlbumHTML(rname,rid,pid);
        resources.push({
            rname: rname,
            pid: cfid,
            rtype:"albumFile",
            rid: rid
        });
        saveToStorage();

    }

    function addPictureToAlbum(){
        let iurl=prompt("Enter an image url");
        if(!iurl){
            return;
        }
        let image=document.createElement("img");
        image.setAttribute("src", iurl);
        image.addEventListener("click",showPictureInMain);

        let divAppPicture=divAppBody.querySelector(".picture-list");
        divAppPicture.appendChild(image);


    }

    function showPictureInMain(){

        // img div in picture-main div
        let divAppAppMain=divAppBody.querySelector(".picture-main > img");
        divAppAppMain.setAttribute("src",this.getAttribute("src"));
        this.setAttribute("pressed",true);
        let divAppPictureList=divAppBody.querySelector(".picture-list");
        let imgs=divAppPictureList.querySelectorAll("img");
        for(let i=0;i<imgs.length;i++){
            imgs[i].setAttribute("pressed",false);
        }
        this.setAttribute("pressed",true);

    }


    function addFolder(){
        let rname=prompt("Enter folder name");
        rname=rname.trim();
        if(!rname){
            //if we do not use return then it will still create a Folder with blank name.
            alert("name cannot be blank.Please enter a name");
            return;
        }
        rname=rname.trim();
        let exists=resources.some(f=>f.rname==rname && f.pid==cfid && f.rtype=="folder");
        
        if(exists){
            alert(rname+"already exists. Please enter a unique name");
            return;

        }


        rid++;
        let pid=cfid;
        addFolderHTML(rname,rid,pid);
        resources.push({
            rname: rname,
            pid: cfid,
            rtype:"folder",
            rid: rid
        });
        saveToStorage();
    }
    function addTextFile(){
        let rname=prompt("Enter textFile name");
        rname=rname.trim();
        if(!rname){
            //if we do not use return then it will still create a Folder with blank name.
            alert("File name cannot be blank.Please enter a name");
            return;
        }
        rname=rname.trim();
        let exists=resources.some(f=>f.rname==rname && f.pid==cfid && f.rtype=="text_file");
        
        if(exists){
            alert(rname+"already exists. Please enter a unique name");
            return;
        }


        rid++;
        let pid=cfid;
        addTextFileHTML(rname,rid,pid);

        //To add default properties to textFile
        resources.push({
            rname: rname,
            pid: cfid,
            rtype:"text_file",
            rid: rid,
            isBold: true,
            isItalic: false,
            isUnderline: false,
            bgColor: "#000000",
            textColor: "#FFFFFF",
            fontFamily: "cursive",
            fontSize: 22,
            content: "I am a new file."

        });
        saveToStorage();
    }


    function renameFolder(){
        // let divFolder=this.parentNode;
        // let divName=document.querySelector("[purpose=name]");
        // let fname="";
        // console.log("Delete folder for"+divName.innerHTML);

        let nrname=prompt("Enter folder's name");
        if(nrname!=null){   //empty
            nrname=nrname.trim();
        }
        if(!nrname){   //space
            alert("Empty name is not allowed");
            return;
        }
        let spanrename=this;
        let divFolder=spanrename.parentNode;
        let divName=divFolder.querySelector("[purpose=name]");
        let orname=divName.innerHTML;
        let ridtbe=parseInt(divFolder.getAttribute("rid"));
        if(orname==nrname){
            alert("Please enter a new name");
            return;
        }
        let exists=resources.some(f=>f.rname==nrname && f.pid==cfid);
        
        if(exists){
            alert(nrname+"already exists. Please enter a unique name");
            return;
        }

        //change html

        divName.innerHTML=nrname;
        //change in ram
        let resource=resources.find(f=>f.rid==ridtbe);
        resource.rname=nrname;
        //change in local storage
        saveToStorage();
    }
    function renameTextFile(){
        let nrname=prompt("Enter folder's name");
        if(nrname!=null){   //empty
            nrname=nrname.trim();
        }
        if(!nrname){   //space
            alert("Empty name is not allowed");
            return;
        }
        let spanrename=this;
        let divTextFile=spanrename.parentNode;
        let divName=divTextFile.querySelector("[purpose=name]");
        let orname=divName.innerHTML;
        let ridtbe=parseInt(divTextFile.getAttribute("rid"));
        if(orname==nrname){
            alert("Please enter a new name");
            return;
        }
        let exists=resources.some(f=>f.rname==nrname && f.pid==cfid);
        
        if(exists){
            alert(nrname+"already exists. Please enter a unique name");
            return;
        }

        //change html

        divName.innerHTML=nrname;
        //change in ram
        let resource=resources.find(f=>f.rid==ridtbe);
        resource.rname=nrname;
        //change in local storage
        saveToStorage();
        
    }

    function renameAlbum(){
        let nrname=prompt("Enter folder's name");
        if(nrname!=null){   //empty
            nrname=nrname.trim();
        }
        if(!nrname){   //space
            alert("Empty name is not allowed");
            return;
        }
        let spanrename=this;
        let divAlbum=spanrename.parentNode;
        let divName=divAlbum.querySelector("[purpose=name]");
        let orname=divName.innerHTML;
        let ridtbe=parseInt(divAlbum.getAttribute("rid"));
        if(orname==nrname){
            alert("Please enter a new name");
            return;
        }
        let exists=resources.some(f=>f.rname==nrname && f.pid==cfid);
        
        if(exists){
            alert(nrname+"already exists. Please enter a unique name");
            return;
        }

        //change html

        divName.innerHTML=nrname;
        //change in ram
        let resource=resources.find(f=>f.rid==ridtbe);
        resource.rname=nrname;
        //change in local storage
        saveToStorage();
        
    }

    function deleteAlbum(){
        let spandelete=this;
        let divAlbum=spandelete.parentNode;
        let divName=divAlbum.querySelector("[purpose='name']");

        let fidtbu=parseInt(divAlbum.getAttribute("rid"));
        let fname=divName.innerHTML;
        
        let sure=confirm("Are u sure u want to delete "+ fname);
        // let sure=confirm("Are u sure u want to delete `${fname}?`");
        if(!sure){
            return;
        }
        //html
        divContainer.removeChild(divAlbum);
        //ram
        let ridx=resources.findIndex(f=>f.rid==fidtbu);
        resources.splice(ridx,1);
        //storage
        saveToStorage();

    }

    function deleteFolder(){
        let spandelete=this;
        let divFolder=spandelete.parentNode;
        let divName=divFolder.querySelector("[purpose='name']");

        let fidtbu=parseInt(divFolder.getAttribute("rid"));
        let fname=divName.innerHTML;
        let childrenexists=resources.some(f=>f.pid==fidtbu);
        let sure=confirm("Are u sure u want to delete"+ fname+"."+childrenexists? "It has children":"");
        if(!sure){
            return;
        }
        //html
        divContainer.removeChild(divFolder);
        //ram
        deleteHelper(fidtbu);

        //storage
        saveToStorage();

    }
    function deleteHelper(fidtbd){
        let children=resources.filter(r=>r.pid==fidtbd);
        for(let i=0;i<children.length;i++){
            deleteHelper(children[i].rid);
        }
        let ridx=resources.findIndex(r=>r.rid==fidtbd);
        //console.log(resources[ridx].rname) To print folder name
        resources.splice(ridx,1);

    }
    function deleteTextFile(){
        let spandelete=this;
        let divTextFile=spandelete.parentNode;
        let divName=divTextFile.querySelector("[purpose='name']");

        let fidtbu=parseInt(divTextFile.getAttribute("rid"));
        let fname=divName.innerHTML;
        
        let sure=confirm("Are u sure u want to delete "+ fname);
        // let sure=confirm("Are u sure u want to delete `${fname}?`");
        if(!sure){
            return;
        }
        //html
        divContainer.removeChild(divTextFile);
        //ram
        let ridx=resources.findIndex(f=>f.rid==fidtbu);
        resources.splice(ridx,1);
        

        //storage
        saveToStorage();
        
    }
    function viewFolder(){
        let spanView=this;
        let divFolder=spanView.parentNode;
        let divName=divFolder.querySelector("[purpose='name']");
        let fname=divName.innerHTML;

        let fid=parseInt(divFolder.getAttribute("rid"));

        let apathTemplate=templates.content.querySelector("a[purpose='path']");
        let apath=document.importNode(apathTemplate,true);

        apath.innerHTML=fname;
        apath.setAttribute("rid",fid);
        apath.addEventListener("click", viewFolderFromPath);

        breadCrumb.appendChild(apath);
        cfid=fid;

        divContainer.innerHTML="";
        for(let i=0;i<resources.length;i++){
            if(resources[i].pid==cfid && resources[i].rtype=="folder"){
                addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
            }
            else if(resources[i].pid==cfid && resources[i].rtype=="text_file"){
                addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);

            }
        }
    }

    function viewFolderFromPath(){
        let apath=this;
        let fid=parseInt(apath.getAttribute("rid"));

     
        //set breadCrumb
        while(apath.nextSibling){
            apath.parentNode.removeChild(apath.nextSibling);
        }

        //alterante way of deleting breadcrumb
        // for(let i=breadCrumb.children.length-1;i>=0;i--){
        //     if(breadCrumb.children[i]==apath){
        //         break;
        //     }
        //     breadCrumb.removeChild(breadCrumb.children[i]);
        // }
        cfid=fid;
        divContainer.innerHTML="";

        //set the container
        for(let i=0;i<resources.length;i++){
            if(resources[i].pid==cfid && resources[i].rtype=="folder"){
                addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
            }else if (resources[i].pid==cfid && resources[i].rtype=="text_file"){
                addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);
            }
        }


    }
    function viewTextFile(){

        let spanView= this;
        let divTextFile=spanView.parentNode;
        let divName=divTextFile.querySelector("[purpose='name']");
        let fname=divName.innerHTML;
        let fid=parseInt(divTextFile.getAttribute("rid"));

    
        let divNotepadMenuTemplate=templates.content.querySelector("[purpose='notepad_menu']");
        let divNotepadMenu=document.importNode(divNotepadMenuTemplate,true);
        divAppMenuBar.innerHTML="";
        divAppMenuBar.appendChild(divNotepadMenu);

        let divNotepadBodyTemplate=templates.content.querySelector("[purpose='notepad_body']");
        let divNotepadBody=document.importNode(divNotepadBodyTemplate,true);
        divAppBody.innerHTML="";
        divAppBody.appendChild(divNotepadBody);

        divAppTitle.innerHTML=fname;
        divAppTitle.setAttribute("rid",fid); 


        let spanSave=divAppMenuBar.querySelector("[action=save]");
        let spanItalic=divAppMenuBar.querySelector("[action=italic]");
        let spanBold=divAppMenuBar.querySelector("[action=bold]");
        let spanUnderline=divAppMenuBar.querySelector("[action=underline]");
        let selectFontFamily=divAppMenuBar.querySelector("[action=font-family]");
        let selectFontSize=divAppMenuBar.querySelector("[action=font-size]");
        let inputTextColor=divAppMenuBar.querySelector("[action=fg-color]");
        let inputBGColor=divAppMenuBar.querySelector("[action=bg-color]");


        let textArea=divAppBody.querySelector("textArea");

        let spandownload=divAppMenuBar.querySelector("[action=download]");
        let inputupload=divAppMenuBar.querySelector("[action=forupload]");
        
        //let inputupload=divAppMenuBar.querySelector("[action=upload]");
        let spanForUpload=divAppMenuBar.querySelector("[action=upload]");

        

        spanSave.addEventListener("click", saveContent);
        spanItalic.addEventListener("click", italicContent);
        spanBold.addEventListener("click", boldContent);
        spanUnderline.addEventListener("click", underlineContent);
        selectFontSize.addEventListener("change", modifySize);
        selectFontFamily.addEventListener("change", modifyFont);
        inputBGColor.addEventListener("change", modifybg);
        inputTextColor.addEventListener("change", modifyfg);
        spandownload.addEventListener("click", downloadNotepad);
        spanForUpload.addEventListener("change", uploadNotepad); 
        inputupload.addEventListener("click",function(){
            spanForUpload.click();
        });

        


        let resource=resources.find(f=>f.rid==fid);
        spanBold.setAttribute("pressed",!resource.isBold);
        spanItalic.setAttribute("pressed",!resource.isItalic);
        spanUnderline.setAttribute("pressed",!resource.isUnderline);
        selectFontSize.value=resource.fontsize;
        selectFontFamily.value=resource.fontfamily;
        inputBGColor.value=resource.bgColor;
        inputTextColor.value=resource.textColor;
        textArea.value=resource.content;
   
        spanBold.dispatchEvent(new Event("click"));
        spanItalic.dispatchEvent(new Event("click"));
        spanUnderline.dispatchEvent(new Event("click"));
        selectFontSize.dispatchEvent(new Event("change"));
        selectFontFamily.dispatchEvent(new Event("change"));
        inputBGColor.dispatchEvent(new Event("change"));
        inputTextColor.dispatchEvent(new Event("change"));            
    }

    function viewAlbum(){
        let spanView= this;
        let divAlbum=spanView.parentNode;
        let divName=divAlbum.querySelector("[purpose='name']");
        let fname=divName.innerHTML;
        let fid=parseInt(divAlbum.getAttribute("rid"));

    
        let divNotepadMenuTemplate=templates.content.querySelector("[purpose='album-menu']");
        let divNotepadMenu=document.importNode(divNotepadMenuTemplate,true);
        divAppMenuBar.innerHTML="";
        divAppMenuBar.appendChild(divNotepadMenu);

        let divNotepadBodyTemplate=templates.content.querySelector("[purpose='album-body']");
        let divNotepadBody=document.importNode(divNotepadBodyTemplate,true);
        divAppBody.innerHTML="";
        divAppBody.appendChild(divNotepadBody);

        divAppTitle.innerHTML=fname;
        divAppTitle.setAttribute("rid",fid);

        let spanAdd=divNotepadMenu.querySelector("[action='add']");
        spanAdd.addEventListener("click",addPictureToAlbum);
    }
    
    function saveContent(){
        let fid=parseInt(divAppTitle.getAttribute("rid"));
        let resource=resources.find(f=>f.rid==fid);

        //let spanSave=divAppMenuBar.querySelector("[action=save]");
        let spanItalic=divAppMenuBar.querySelector("[action=italic]");
        let spanBold=divAppMenuBar.querySelector("[action=bold]");
        let spanUnderline=divAppMenuBar.querySelector("[action=underline]");
        let selectFontFamily=divAppMenuBar.querySelector("[action=font-family]");
        let selectFontSize=divAppMenuBar.querySelector("[action=font-size]");
        let inputTextColor=divAppMenuBar.querySelector("[action=fg-color]");
        let inputBGColor=divAppMenuBar.querySelector("[action=bg-color]");
        let textArea=divAppBody.querySelector("textArea");
        //let spandownload=divAppMenuBar.querySelector("[action=download]");
        //let inputupload=divAppMenuBar.querySelector("[action=upload]");

        resource.isBold=spanBold.getAttribute("pressed")=="true";
        resource.isItalic=spanItalic.getAttribute("pressed")=="true";
        resource.isUnderline=spanUnderline.getAttribute("pressed")=="true";
        resource.bgColor=inputBGColor.value;
        resource.textColor=inputTextColor.value;
        resource.fontfamily=selectFontFamily.value;
        resource.fontsize=selectFontSize.value;
        resource.content=textArea.value;


        
        saveToStorage();
    }
    function italicContent(){
        let textArea=divAppBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed){
            this.setAttribute("pressed", false);
            textArea.style.fontStyle="normal";
        }else{
            this.setAttribute("pressed", true);
            textArea.style.fontStyle="italic";
        }

    }
    function boldContent(){
        let textArea=divAppBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed){
            this.setAttribute("pressed", false);
            textArea.style.fontWeight="normal";
        }else{
            this.setAttribute("pressed", true);
            textArea.style.fontWeight="bold";
        }

    }
    function underlineContent(){
        let textArea=divAppBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed){
            this.setAttribute("pressed", false);
            textArea.style.textDecoration="none";
        }else{
            this.setAttribute("pressed", true);
            textArea.style.textDecoration="underline";
        }

    }
    function modifySize(){
        let size=this.value;
        let textarea=divAppBody.querySelector("textArea");
        textarea.style.fontSize=size+"px";

    }
    function modifyFont(){
        let fontFamily=this.value;
        let textarea=divAppBody.querySelector("textArea");
        textarea.style.fontFamily=fontFamily;

    }
    function modifybg(){
        let color=this.value;
        let textarea=divAppBody.querySelector("textArea");
        textarea.style.backgroundColor=color;
    }
    function modifyfg(){
        let color=this.value;
        let textarea=divAppBody.querySelector("textArea");
        textarea.style.color=color;
    }
    function downloadNotepad(){
        let fid=parseInt(divAppTitle.getAttribute("rid"));
        let resource=resources.find(f=>f.rid==fid);
        let divNotepadMenu=this.parentNode;

        let strForDownload=JSON.stringify(resource);
        let encodedData=encodeURIComponent(strForDownload);

        let aDownload=divNotepadMenu.querySelector("a[purpose=download]");
        aDownload.setAttribute("href","data:text/json;charset=utf-8, "+encodedData);
        aDownload.setAttribute("download",resource.rname+".json");

        aDownload.click();


    }
    function uploadNotepad(){
        let file=window.event.target.files[0];
        let reader=new FileReader();
        reader.addEventListener("load", function(){
        let data=window.event.target.result;
        let resource=JSON.parse(data);

            
        
        let spanItalic=divAppMenuBar.querySelector("[action=italic]");
        let spanBold=divAppMenuBar.querySelector("[action=bold]");
        let spanUnderline=divAppMenuBar.querySelector("[action=underline]");
        let selectFontFamily=divAppMenuBar.querySelector("[action=font-family]");
        let selectFontSize=divAppMenuBar.querySelector("[action=font-size]");
        let inputTextColor=divAppMenuBar.querySelector("[action=fg-color]");
        let inputBGColor=divAppMenuBar.querySelector("[action=bg-color]");
        let textArea=divAppBody.querySelector("textArea");
        


        spanBold.setAttribute("pressed",!resource.isBold);
        spanItalic.setAttribute("pressed",!resource.isItalic);
        spanUnderline.setAttribute("pressed",!resource.isUnderline);
        selectFontSize.value=resource.fontsize;
        selectFontFamily.value=resource.fontfamily;
        inputBGColor.value=resource.bgColor;
        inputTextColor.value=resource.textColor;
        textArea.value=resource.content;
   
        spanBold.dispatchEvent(new Event("click"));
        spanItalic.dispatchEvent(new Event("click"));
        spanUnderline.dispatchEvent(new Event("click"));
        selectFontSize.dispatchEvent(new Event("change"));
        selectFontFamily.dispatchEvent(new Event("change"));
        inputBGColor.dispatchEvent(new Event("change"));
        inputTextColor.dispatchEvent(new Event("change")); 


        })
        reader.readAsText(file);

        //why do we read reader.readAsText(file) at end? if the reading gets completed before loading events. Event listener may not get fired. 
        // to avoid this we keep reader function at end of operation.
    }

    function addFolderHTML(rname,rid,pid){
        let divFolderTemplate=templates.content.querySelector(".folder");
        let divFolder=document.importNode(divFolderTemplate,true);

        let spanRename=divFolder.querySelector("[action=rename]");
        let spanView=divFolder.querySelector("[action=view]");
        let spanDelete=divFolder.querySelector("[action=delete]");
        let divName=divFolder.querySelector("[purpose=name]");

        spanRename.addEventListener("click", renameFolder);
        spanDelete.addEventListener("click", deleteFolder);
        spanView.addEventListener("click", viewFolder);

        
        divName.innerHTML=rname;
        divFolder.setAttribute("rid",rid);
        divFolder.setAttribute("pid",pid);
        divContainer.appendChild(divFolder);

    }

    function addTextFileHTML(rname,rid,pid){
        let divTextFileTemplate=templates.content.querySelector(".textFile");
        let divFile=document.importNode(divTextFileTemplate,true);

        let spanRename=divFile.querySelector("[action=rename]");
        let spanView=divFile.querySelector("[action=view]");
        let spanDelete=divFile.querySelector("[action=delete]");
        let divName=divFile.querySelector("[purpose=name]");

        spanRename.addEventListener("click", renameTextFile);
        spanDelete.addEventListener("click", deleteTextFile);
        spanView.addEventListener("click", viewTextFile);

        
        divName.innerHTML=rname;
        divFile.setAttribute("rid",rid);
        divFile.setAttribute("pid",pid);
        divContainer.appendChild(divFile);

    }
    function addAlbumHTML(rname,rid,pid){
        let divAlbumFileTemplate=templates.content.querySelector(".album");
        let divAlbumFile=document.importNode(divAlbumFileTemplate,true);

        let spanRename=divAlbumFile.querySelector("[action=rename]");
        let spanView=divAlbumFile.querySelector("[action=view]");
        let spanDelete=divAlbumFile.querySelector("[action=delete]");
        let divName=divAlbumFile.querySelector("[purpose=name]");

        spanRename.addEventListener("click", renameAlbum);
        spanDelete.addEventListener("click", deleteAlbum);
        spanView.addEventListener("click", viewAlbum);

        
        divName.innerHTML=rname;
        divAlbumFile.setAttribute("rid",rid);
        divAlbumFile.setAttribute("pid",pid);
        divContainer.appendChild(divAlbumFile);

    }
    function saveToStorage(){
        let rjson=JSON.stringify(resources);
        localStorage.setItem("data",rjson);

    }
    function loadFromStorage(){
        //if we do not write loadFrom storage function(keep it as blank) then on refresh data from html will vanish and after again adding
        //new folder it will also get deleted from resources folder
        let rjson=localStorage.getItem("data");
        
        if(!!rjson){
            resources=JSON.parse(rjson);
            for(let i=0;i<resources.length;i++){
                if(resources[i].pid==cfid && resources[i].rtype=="folder"){
                    addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                }
                else if(resources[i].pid==cfid && resources[i].rtype=="text_file"){
                    addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);

                }
                else if(resources[i].pid==cfid && resources[i].rtype=="albumFile"){
                    addAlbumHTML(resources[i].rname,resources[i].rid,resources[i].pid);

                }
                if(resources[i].rid>rid){
                    rid=resources[i].rid;
                }
            }
        }
    }
    loadFromStorage();
})();