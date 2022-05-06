// select unordered list and for each cupcake, write the html for a li, and insert it
// on submit, get form data, post it, and then add to dom
const BASE_URL = "http://127.0.0.1:5000/api"
let cupcakeList
const $cupcakeList = $('#cupcake-list')
const $addCupcakeForm = $('#add-cupcake-form')

// *****************************
// CLASSES
// *****************************

class Cupcake {
    constructor({id, flavor, size, rating, image}) {
        this.id = id
        this.flavor = flavor
        this.size = size
        this.rating = rating
        this.image = image
    }
}

class CupcakeList {
    constructor(cupcakes) {
        this.cupcakes = cupcakes
    }

    static async getCupcakes () {
        const response = await axios({
			url    : `${BASE_URL}/cupcakes`,
			method : 'GET'
		})
        const cupcakes = response.data.cupcakes.map((cupcake) => new Cupcake(cupcake))
        return new CupcakeList(cupcakes)
    }
    
    async addCupcake (newCupcake) {
        const response = await axios({
			url    : `${BASE_URL}/cupcakes`,
			method : 'POST',
			data   : newCupcake
		})
		const cupcake = new Cupcake(response.data.cupcake)
		return cupcake
    }
}

// *****************************
// SHOW CUPCAKE LIST
// *****************************

const getAndShowCupcakes = async () => {
    cupcakeList = await CupcakeList.getCupcakes()
    putCupcakeListOnPage()
}

const putCupcakeListOnPage = () => {
    for (let cupcake of cupcakeList.cupcakes) {
		const $cupcake = generateCupcakeMarkup(cupcake)
		$cupcakeList.append($cupcake)
	}
}

const generateCupcakeMarkup = (cupcake) => {
    return $(`
    <li class="list-group-item text-center" id="${cupcake.id}">
      Flavor: ${cupcake.flavor}, Size: ${cupcake.size}, Rating: ${cupcake.rating}
      <img class="mx-auto" src="${cupcake.image}">
    </li>
  `)
}

// *****************************
// HANDLE ADD CUPCAKE FORM
// *****************************

const putNewCupcakeOnPage = async (e) => {
    e.preventDefault()

    const flavor = $('#flavor').val()
    const size = $('#size').val()
    const rating = $('#rating').val()
    const image = $('#image').val()
    
    const newCupcake = await cupcakeList.addCupcake({flavor, size, rating, image})
    const $newCupcake = generateCupcakeMarkup(newCupcake)

    $cupcakeList.append($newCupcake)
    $addCupcakeForm.trigger('reset')
}

$addCupcakeForm.on('submit', putNewCupcakeOnPage)

// *****************************
// START APP
// *****************************
getAndShowCupcakes()