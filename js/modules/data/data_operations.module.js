import { contentData } from "./content_data.module.js";

// Function, which takes data from a 'database-array'
//and counting categories values and quantities

export function notesQuantityByCategories(obj) {
  let arr = Object.values(obj);

  let categoriesSequence = [];

  function getCategoriesList(arr) {
    let result = [];
    arr.forEach((el) => {
      result.push(el.category);
    });
    return result;
  }

  arr.forEach((el) => {
    categoriesSequence.push(getCategoriesList(el));
  });

  let visibleCategoriesSequence = categoriesSequence[0].sort();
  let archievedCategoriesSequence = categoriesSequence[1].sort();

  categoriesSequence = categoriesSequence.flat(1).sort();

  let categoriesList = Array.from(new Set(categoriesSequence));

  function calculateEntriesQuantity(arr) {
    let result = [];
    let counter = 1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == arr[i + 1]) {
        counter = counter + 1;
      } else {
        result.push(counter);
        counter = 1;
      }
    }
    return result;
  }

  let visibleQuantity = calculateEntriesQuantity(visibleCategoriesSequence);
  let archivedQuantity = calculateEntriesQuantity(archievedCategoriesSequence);

  function createResultObject(arr1, arr2, arr3) {
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
      let obj = {};
      if (arr2[i] == undefined) {
        arr2[i] = 0;
      }
      if (arr3[i] == undefined) {
        arr3[i] = 0;
      }
      obj.category = arr1[i];
      obj.visible = arr2[i];
      obj.archived = arr3[i];
      result.push(obj);
    }
    return result;
  }

  let result = createResultObject(
    categoriesList,
    visibleQuantity,
    archivedQuantity
  );

  return result;
}

// Function which take values from 'new note form' and white it to the 'database-array'

export function addNewNoteItem(el) {
  // Recieve user-entered data from field of form

  let name = el.querySelector("#create_note_name").value;
  let category = el.querySelector("#create_note_category").value;
  let content = el.querySelector("#create_note_content").value;

  // Recieve a current date when user submit form

  function getCurrentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.toLocaleString("en", { month: "long" });
    let day = date.getDate();
    let fullDate = [];
    fullDate.push(month, " ", day, ", ", year);
    let string = fullDate.join("");

    return string;
  }

  let created = getCurrentDate();

  // Parse content string to find some dates uses as deadlines for a note
  //  to do later

  let string = content;
  let regexp = /(\d{1,4}([./-])\d{1,2}([./-])\d{1,4})/g;
  let stringEntries = string.match(regexp);

  // below function is a little bit excessive, and written just to train how to work with array spread operator

  function func() {
    let u = [];
    u.push(...arguments);
    if (u == 0 || u == null) {
      return (u = []);
    }
    if (u.length > 2) {
      u.splice(1, u.length - 2);
    }
    if (u.length < 2) {
      u.push("deadlineless");
    }

    const regexp = /([./-])/gi;

    u.forEach((el, index) => {
      el = el.replaceAll(regexp, ".");
      u[index] = el;
    });

    u[0] = "Start: " + u[0];
    u[1] = "End: " + u[1];
    u = u.join("\n");

    return u;
  }

  let deadlines;

  try {
    deadlines = func(...stringEntries);
  } catch (error) {
    let err = "stringEntries is not iterable (cannot read property null)";
    if (error.message == err) {
      deadlines = "";
    } else {
      console.log(error);
    }
  }

  //  Result object compiling

  let result = {
    name: name,
    created: created,
    category: category,
    content: content,
    deadlines: deadlines,
  };

  return result;
}

// Dislocate note from-to in database

export function dislocateNote(index, val) {
  let from;
  let to;
  if (val == "visible") {
    from = contentData.visibleNotes;
    to = contentData.archivedNotes;
  } else if (val == "archived") {
    to = contentData.visibleNotes;
    from = contentData.archivedNotes;
  }

  try {
    let note = from[index];
    to.push(note);
    from.splice(index, 1);
  } catch (error) {
    console.log(
      "ERROR : Undefined incoming `val` parameter or false `index` parameter"
    );
  }
}

// Change values in 'note-item' in 'database'

export function changeNoteItem(obj, index, val) {
  let to;
  if (val == "visible") {
    to = contentData.visibleNotes[index];
  }
  if (val == "archived") {
    to = contentData.archivedNotes[index];
  }
  to.name = obj.name;
  to.created = obj.created;
  to.category = obj.category;
  to.content = obj.content;
  to.deadlines = obj.deadlines;
}
