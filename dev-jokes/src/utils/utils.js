export const g2aTags = (gTags) => {
  var aTags = []
    gTags.forEach(element => {
    aTags.push(element["name"])
  });
  return aTags
}

export const a2gTags = (aTags) => {
  var gTags = []
  aTags.forEach(element => {
    gTags.push({"name": element})
  });
  return gTags
}

export const dataURItoBlob = (dataURI) => {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}