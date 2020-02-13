
const UTILS = { 

    imagesFromProducts (width, height, produto, cor_produto)  {
        const previewImage = `http://soma-image-search.somalabs.com.br/query/${width}/${height}/${produto}/${cor_produto}` 
        return previewImage
    },

    formatToMaxCaractersAllowed(text,max) {
        if(!text) return "texto não inserido"
        if (text.length > max) {
            return `${text.substring(0, max)}...`
        } else {
            return text
        }
    }


}

export default UTILS