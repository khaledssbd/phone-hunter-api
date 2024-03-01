const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)

  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }
  // console.log('is show all', isShowAll)
  // display only first 12 phones if not show All
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // console.log(phone);
    //* 2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `bg-white rounded-lg border-[1px] border-[#CFCFCF] p-6 mx- h-[633px] w-[364px]`;
    //* 3: set inner html
    phoneCard.innerHTML = `
    <div class="flex items-center justify-center bg-[#0D6EFD0D] rounded-lg h-[300px] w-[314px] p-4"><img src="${phone.image}" alt="Phones" />
    </div>
    <div class="flex flex-col items-center">
        <h2 class="text-[#403F3F] text-xl font-bold mt-6 mb-5">${phone.phone_name}</h2>
        <p class="text-[#706F6F] text-base font-normal">There are many variations of <br> passages of available,
            but the <br> majority have suffered</p>
        <h4 class="text-[#403F3F] text-xl font-bold mt-2 mb-4">$999</h4>
        <button onclick="handleShowDetail('${phone.slug}')"
            class="bg-[#0D6EFD] rounded-lg h-12 w-40 text-white text-lg font-semibold">Show Details</button>

    </div>`;
    //* 4 append child
    phoneContainer.appendChild(phoneCard);
  });

  //* hide loading spinner
  toggleLoadingSpinner(false);
};

//! handle show all (true=show or false=hide) start
const handleShowAll = () => {
  handleSearch(true);
};
//! handle show all end

//! handle search button (takes handleShowAll -> true=show or false=hide) start
const handleSearch = isShowAll => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  let searchText = searchField.value;
  if (!searchText) {
    searchText = 'm';
  }
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};
//! handle search button end

//! loadingSpinner (true=show or false=hide) start
const toggleLoadingSpinner = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};
//! loadingSpinner end

//! show details start
const handleShowDetail = async id => {
  // console.log('clicked show details', id)
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = phone => {
  //   console.log(phone);
  const phoneImage = document.getElementById('show-phone-image');
  phoneImage.innerHTML = `
  <div class="flex justify-center bg-[#0D6EFD0D] rounded-lg p-6"><img src="${phone.image}" alt="" />
  </div>
        `;
  const showDetailContainer = document.getElementById('show-detail-container');

  showDetailContainer.innerHTML = `
        <h3 class="font-bold text-3xl text-center my-3">${phone.name}</h3>
        <p class="text-[#706F6F] text-base font-normal"><span class="text-[#403F3F] text-base font-semibold">Storage: </span>${
          phone?.mainFeatures?.storage
        }</p>
        <p class="text-[#706F6F] text-base font-normal"><span class="text-[#403F3F] text-base font-semibold">GPS: </span>${
          phone.others?.GPS || 'No GPS available'
        }</p>
        <p class="text-[#706F6F] text-base font-normal"><span class="text-[#403F3F] text-base font-semibold">GPS: </span>${
          phone.others?.GPS
            ? phone.others.GPS
            : 'No GPS available in this device'
        }</p>
        </div>
    `;

  // show the modal
  show_details_modal.showModal();
};
//! show details end

//* home page call
loadPhone('m');
toggleLoadingSpinner(true);
