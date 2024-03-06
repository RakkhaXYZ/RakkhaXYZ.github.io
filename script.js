document.addEventListener('DOMContentLoaded', readData);

function createData(){
const nama = document.getElementById('nama').value.trim();
const email = document.getElementById('email').value.trim();
const pesan = document.getElementById('pesan').value.trim();

if(nama === '' || email==='' || pesan===''){
  alert('Form Contact Tidak Boleh Kosong');
  return;
}
const data = JSON.parse(localStorage.getItem('crudData') || '[]');
const newData = {
  id: data.length + 1,
  nama: nama,
  email: email,
  pesan: pesan,
};
data.push(newData);
localStorage.setItem('crudData', JSON.stringify(data));
document.getElementById('nama').value = '';
document.getElementById('email').value ='';
document.getElementById('pesan').value ='';

readData();

}
function readData(){
  const datamasuk = document.getElementById('datamasuk');
  datamasuk.innerHTML = '<table class="table table-striped" id="dataTable"><tr><th>ID</th><th>Nama Pengirim</th><th>Email Pengirim</th><th>Pesan</th><th>aksi</th></tr></table>';
  const table = document.getElementById('dataTable');
  const data = JSON.parse(localStorage.getItem('crudData') || '[]');
  displayData(data);
  data.forEach((item) =>{
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.textContent = item.id;
    cell2.textContent = item.nama;
    cell3.textContent = item.email;
    cell3.textContent = item.pesan;

    cell5.innerHTML = `<button onclick="updateData(${item.id})" class="btn btn-primary">Edit Data</button> <button onclick="deleteData(${item.id})">Delete</button>`;
  });
}

function updateData(id){
  const Newnama = prompt('Masukan Nama Baru');
  const Newemail = prompt('Masukan email Baru');
  const NewPesan = prompt('Edit Pesan');
  if(Newnama.trim() === '' || Newemail.trim() === '' || NewPesan.trim()===''){
    alert('Data Tidak Boleh Ada Yang Kosong');
    return;
  }

  let data = JSON.parse(localStorage.getItem('crudData') || '[]');
  const index = data.findIndex((item) => item.id === id);
  if(index !== -1){
    data[index].nama = Newnama;
    data[index].email = Newemail;
    data[index].pesan = NewPesan;
    localStorage.setItem('crudData', JSON.stringify(data));
  }
  readData();
}

function deleteData(id){
  const isConfirmed = confirm('Yakin anda ingin menghapus data ini');

  if(isConfirmed){
    let data = JSON.parse(localStorage.getItem('crudData') || '[]');
    data = data.filter((item) => item.id !== id);
    localStorage.setItem('crudData', JSON.stringify(data));
    readData();
  }
}

function displayData(data){
  const datamasuk = document.getElementById('datamasuk');
  datamasuk.innerHTML = '<table class="table table-striped" id="dataTable"><tr><th>ID</th> <th>Nama Pengirim</th> <th>Email Pengirim</th> <th>Pesan</th> <th>aksi</th></tr></table>';
  const table = document.getElementById('dataTable');
  data.forEach((item) => {
    const row = table.insertRow(-1);
    row.insertCell(0).textContent = item.id;
    row.insertCell(1).textContent = item.nama;
    row.insertCell(2).textContent = item.email;
    row.insertCell(3).textContent = item.pesan;
    row.insertCell(4).innerHTML = `<button onclick="updateData(${item.id})" class="btn btn-primary">Edit Data </button> <button onclick="deleteData(${item.id})" class="btn btn-danger">Hapus </button>` ;


  });
}