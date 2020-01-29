const imagesFromProducts = (width, height, produto, cor_produto) => {
    const previewImage = `http://soma-image-search.somalabs.com.br/query/${width}/${height}/${produto}/${cor_produto}` 
    return previewImage
}

export default imagesFromProducts