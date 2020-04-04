//const ORDERS_API = `https://l87f6pawcf.execute-api.us-east-1.amazonaws.com/production/api/plans`;
const ORDERS_API = `https://financial-plans.ivchip.now.sh/api/plans`;
let contentTable = document.querySelector('.contentTable');
let loader = document.querySelector('.loader');
let createUpdate = document.querySelector('.createUpdate');
//let main = document.querySelector('.main');
let main = document.querySelector('.main_crud_section');
let noUpdate = document.querySelector('.noUpdate');
let onlyInputs = document.querySelector('.onlyInputs');
let isUpdate = false;
let isUpdateImage = false;

let createUpdateForm = document.getElementById('createUpdateForm');
let _id = document.getElementById('_id');
let name = document.getElementById('name');
let rate = document.getElementById('rate');
let per = document.getElementById('per');
let n_per = document.getElementById('nPer');
let down_payment = document.getElementById('downPayment');
let residual_payment = document.getElementById('residualPayment');
let grace_per = document.getElementById('gracePer');
let image_url = document.getElementById('imageUrl');

window.addEventListener('load', () => {
  fetchPlans();
});

function hideSpinner() {
  if (loader.style.display === 'none') {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
    createUpdate.style.display = 'none';
  }
}

function showCreatePlan() {
  main.style.display = 'none';
  createUpdate.style.display = 'block';
  enableInputs();
  clearInputs();
  isUpdate = false;
  isUpdateImage = false;
}

function fetchPlans() {
  loader.style.display = 'block';
  fetch(`${ORDERS_API}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        printTable(response.data);
      } else {
        loader.style.display = 'none';
      }
    })
    .catch(error => {
      loader.style.display = 'none';
      alert(`HTTP-Error: ${error}`);
    });
}

function printTable(data) {
  contentTable.innerHTML = '';
  let index = 1;
  data.map(item => {
    contentTable.innerHTML += `
    <tr>
      <td class='data_col_min hidden_col'>${index}</td>
      <td class='data_col_min col-sm-2 col-md-2 col-lg-2'>${item.name}</td>
      <td class='data_col_min col-sm-1 col-md-1 col-lg-1'>${item.rate}</td>
      <td class='data_col_min col-sm-1 col-md-1 col-lg-1'>${item.per}</td>
      <td class='data_col_min col-sm-1 col-md-1 col-lg-1'>${item.n_per}</td>
      <td class='data_col_min col-sm-1 col-md-1 col-lg-1'>${item.down_payment}</td>
      <td class='data_col_min col-sm-1 col-md-1 col-lg-1'>${item.residual_payment}</td>
      <td class='data_col_min' col-sm-1 col-md-1 col-lg-1>${item.grace_per}</td>
      <td class='data_col_min hidden_col'>
        <span>${item.image_url}</span>
      </td>    
      <!--
      <td class='data_col_min col-sm-2 col-md-2 col-lg-2'>
        <span class='data_col_butt'>
          <button onclick="planById('${item._id}', 'imageUpdate')" class="btn crud-edit-btn"><i class="far fa-images"></i></button>
        </span>
      </td>
      -->
      <!--
      <td>
        <button onclick="planById('${item._id}', 'imageUpdate')" class="btn">Change image</button>
      </td>
      -->
      
      <td>
        <span class='data_col_butt col-sm-2 col-md-2 col-lg-2'>
          <button onclick="planById('${item._id}', 'dataUpdate')" class="btn crud-edit-btn"><i class="fas fa-edit"></i></button>
        </span>
        <span class='data_col_butt'>
          <button id="btn_${item._id}" onclick="toggleState('${item._id}', ${item.active});" class="btn crud-edit-btn">
              ${item.active == true ? '<i class="fas fa-toggle-on"></i>' : '<i class="fas fa-toggle-off"></i>'}
          </button>
        </span>
      
      </td>
    </tr>
    `;
    index++;
  });
  loader.style.display = 'none';
}

function toggleState(id, state) {
  loader.style.display = 'block';
  fetch(`${ORDERS_API}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      active: !state
    })
  })
    .then(response => response.json())
    .then(response => {
      let btn = document.getElementById(`btn_${id}`);
      btn.setAttribute('onClick', `toggleState('${id}', ${!state})`);
      btn.innerHTML = !state == true ? `<i class="fas fa-toggle-on"></i>` : `<i class="fas fa-toggle-off"></i>`;
      fetchMessage(response);
      loader.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';
      alert(`HTTP-Error: ${error}`);
    });
}

function planById(id, context) {
  loader.style.display = 'block';
  fetch(`${ORDERS_API}?_id=${id}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        if (context === 'dataUpdate') {
          main.style.display = 'none';
          createUpdate.style.display = 'block';
          onlyInputs.style.display = 'block';
          const data = response.data[0];
          _id.value = data._id;
          name.value = data.name;
          rate.value = data.rate;
          per.value = data.per;
          n_per.value = data.n_per;
          down_payment.value = data.down_payment;
          residual_payment.value = data.residual_payment;
          grace_per.value = data.grace_per;
          enableInputs();
          /*noUpdate.style.display = 'none';*/
          /*noUpdate.style.display = 'block';*/
          image_url.required = false;
          isUpdate = true;
        } else if (context === 'imageUpdate') {
          image_url.value = '';
          main.style.display = 'none';
          createUpdate.style.display = 'block';
          onlyInputs.style.display = 'none';
          const data = response.data[0];
          _id.value = data._id;
          disableInputs();
          noUpdate.style.display = 'block';
          image_url.required = false;  // true
          isUpdate = true;
          //isUpdateImage = true;
          isUpdateImage = false;
        }
      }
      loader.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';
      alert(`HTTP-Error: ${error}`);
    });
}

createUpdateForm.onsubmit = function(event) {
  event.preventDefault();
  isUpdateImage = true; /// test image
  const formData = dataForm();
  if (confirm('Are you sure you submit?')) {
    loader.style.display = 'block';
    if (!isUpdate) {
      fetch(`${ORDERS_API}`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(response => {
          updateView();
          fetchMessage(response);
        })
        .catch(error => {
          loader.style.display = 'none';
          alert(`HTTP-Error: ${error}`);
        });
    } else {
      if (!isUpdateImage) {
        fetch(`${ORDERS_API}/${_id.value}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(response => {
            updateView();
            fetchMessage(response);
          })
          .catch(error => {
            loader.style.display = 'none';
            alert(`HTTP-Error: ${error}`);
          });
      } else {
        fetch(`${ORDERS_API}/image/${_id.value}`, {
          method: 'PUT',
          body: formData
        })
          .then(response => response.json())
          .then(response => {
            updateView();
            fetchMessage(response);
          })
          .catch(error => {
            loader.style.display = 'none';
            alert(`HTTP-Error: ${error}`);
          });
      }
    }
  }
};

function isInt(evt) {
  let charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

function isFloat(evt, id) {
  let charCode = evt.which ? evt.which : event.keyCode;
  if (charCode == 46) {
    let txt = document.getElementById(id).value;
    if (!(txt.indexOf('.') > -1)) {
      return true;
    }
  }
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

function dataForm() {
  if (!isUpdate) {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('rate', Number(rate.value));
    formData.append('per', Number(per.value));
    formData.append('n_per', Number(n_per.value));
    formData.append('down_payment', Number(down_payment.value));
    formData.append('residual_payment', Number(residual_payment.value));
    formData.append('grace_per', Number(grace_per.value));
    formData.append('image_url', image_url.files[0]);
    return formData;
  } else {
    if (!isUpdateImage) {
      return {
        name: name.value,
        rate: Number(rate.value),
        per: Number(per.value),
        n_per: Number(n_per.value),
        down_payment: Number(down_payment.value),
        residual_payment: Number(residual_payment.value),
        grace_per: Number(grace_per.value)
      };
    } else {
      const formData = new FormData();
      formData.append('image_url', image_url.files[0]);
      return formData;
    }
  }
}

function clearInputs() {
  _id.value = '';
  name.value = '';
  rate.value = '';
  per.value = '';
  n_per.value = '';
  down_payment.value = '';
  residual_payment.value = '';
  grace_per.value = '';
  image_url.value = '';
  image_url.required = true;
  noUpdate.style.display = 'block';
}

function disableInputs() {
  name.required = false;
  rate.required = false;
  per.required = false;
  n_per.required = false;
  down_payment.required = false;
  residual_payment.required = false;
  grace_per.required = false;
}

function enableInputs() {
  name.required = true;
  rate.required = true;
  per.required = true;
  n_per.required = true;
  down_payment.required = true;
  residual_payment.required = true;
  grace_per.required = true;
}

function fetchMessage(json) {
  if (json.message) {
    alert(json.message);
  } else {
    alert(json.error);
  }
}

function updateView() {
  createUpdate.style.display = 'none';
  onlyInputs.style.display = 'block';
  main.style.display = 'block';
  loader.style.display = 'none';
  fetchPlans();
}

function showTable() {
  createUpdate.style.display = 'none';
  onlyInputs.style.display = 'block';
  noUpdate.style.display = 'block';
  main.style.display = 'block';
}

function validateImage() {
  let file = image_url.files[0];
  let type = file.type.split('/').pop().toLowerCase();
  if (type != "jpeg" && type != "jpg" && type != "png" && type != "gif") {
      alert('Please select a valid image file');
      image_url.value = '';
  }
  if (file.size > 1024000 * 5) {
      alert('Max Upload size is 5MB only');
      image_url.value = '';
  }
}
