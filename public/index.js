const form = document.getElementById('form');
const input = document.getElementById('image');
let progress_area = document.getElementById('progress_area');
let upload_area = document.getElementById('upload_area')

form.addEventListener('click', () => {
    input.click();
});

input.onchange = e => {
    const file = e.target.files[0];
    if (file) {
        const { name } = file;
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData, name);
    }
}
const uploadFile = (formData, name) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/upload-image');
    xhr.upload.addEventListener('progress', ({ loaded, total }) => {
        const filePar = Math.floor((loaded / total) * 100);
        let fileSize = Math.floor(total / 1000);
        fileSize > 1024 ? fileSize = (loaded / (1000 * 1000)).toFixed(2) + 'MB' : fileSize = fileSize + 'KB';

        let progressHTML = `<li class="row">
        <i class="fa fa-file"></i>
        <div class="content">
            <div class="details">
                <span class="name">${name}</span>
                <span class="parsent">${filePar}%</span>
            </div>
            <div class="progress-bar">
                <div style="width : ${filePar}%" class="progress"></div>
            </div>
        </div>
    </li>`;

    let uploadHTML = `<li class="row">
    <div class="content">
        <i class="fa fa-file"></i>
        <div class="details">
            <span class="name">${name}</span>
            <span class="size">${fileSize}</span>
        </div>
    </div>
    <i class="fa fa-check"></i>
</li>`;
    progress_area.innerHTML = progressHTML;
    if(total === loaded){
        progress_area.innerHTML = ''
        upload_area.insertAdjacentHTML('afterbegin',uploadHTML);
    }
    })

    xhr.send(formData);
}