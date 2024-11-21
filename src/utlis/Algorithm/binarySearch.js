export default function binarySearch(arr, query) {
  let left = 0;
  let right = arr.length - 1;

  const trimmedQuery = query.trim().toLowerCase();
  console.log(trimmedQuery);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const { first_name, middle_name, last_name } = arr[mid].patientDetails;
    let fullName;
    if (middle_name == "") {
      fullName = `${first_name} ${last_name}`.trim().toLowerCase();
    } else {
      fullName = `${first_name} ${middle_name} ${last_name}`
        .trim()
        .toLowerCase();
    }
    console.log(fullName);

    if (fullName === trimmedQuery) {
      return arr[mid];
    }
    if (fullName < trimmedQuery) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null; // Return null if no match is found
}
