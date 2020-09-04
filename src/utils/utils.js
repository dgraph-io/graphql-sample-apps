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

export const isPresentInListOfDict = (list, key, value) => {
  list.forEach((item) => {
    if (item[key] === value) {
      return true;
    }
  });
  return false;
}

// Sort by: new, old, liked
export const sortBy = (data, by) => {
  let newData;
  console.log("Sorting by:", by);

  if (by === "new") {
    newData = data
      .slice()
      .sort((a, b) => Date.parse(b.timeStamp) - Date.parse(a.timeStamp));
  } else if (by === "old") {
    newData = data
      .slice()
      .sort((a, b) => Date.parse(a.timeStamp) - Date.parse(b.timeStamp));
  } else if (by === "liked") {
    newData = data
      .slice()
      .sort((a, b) => b.likes.length - a.likes.length);
  }
  return newData
}