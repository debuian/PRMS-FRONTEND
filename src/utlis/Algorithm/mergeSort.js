// mergeSort.js
function mergeSort(arr, comparator) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2); //5
  const left = mergeSort(arr.slice(0, mid), comparator); //0-4 5
  const right = mergeSort(arr.slice(mid), comparator); //5-9 5

  return merge(left, right, comparator);
}

function merge(left, right, comparator) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (comparator(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function comparator(a, b) {
  const firstNameA = a.patientDetails.first_name.toLowerCase();
  const firstNameB = b.patientDetails.first_name.toLowerCase();
  const middleNameA = a.patientDetails.middle_name.toLowerCase();
  const middleNameB = b.patientDetails.middle_name.toLowerCase();
  const lastNameA = a.patientDetails.last_name.toLowerCase();
  const lastNameB = b.patientDetails.last_name.toLowerCase();

  if (firstNameA < firstNameB) return -1;
  if (firstNameA > firstNameB) return 1;

  // If first names are equal, compare middle names
  if (middleNameA < middleNameB) return -1;
  if (middleNameA > middleNameB) return 1;

  // If middle names are equal, compare last names
  if (lastNameA < lastNameB) return -1;
  if (lastNameA > lastNameB) return 1;

  // If all are equal, return 0
  return 0;
}

export { mergeSort, comparator };
