import { contentData } from "./content_data.module.js";

 export function notesQuantityByCategories(obj) {

    let arr = Object.values(obj);

    let categoriesSequence = [];

    function getCategoriesList(arr){
        let result = [];
        arr.forEach(el => {
            result.push(el.category);
        });
        return result;
    };

    arr.forEach(el => {
        categoriesSequence.push(getCategoriesList(el));
    });

    let visibleCategoriesSequence = categoriesSequence[0].sort();
    let archievedCategoriesSequence = categoriesSequence[1].sort();

    categoriesSequence = categoriesSequence.flat(1).sort();

    let categoriesList = Array.from(new Set(categoriesSequence));

   function calculateEntriesQuantity (arr) {
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
   let archivedQuantity = calculateEntriesQuantity(categoriesSequence);

   function createResultObject(arr1, arr2, arr3){
       let result = [];
        for (let i = 0; i < arr1.length; i++) {
            let obj = {};
            obj.category = arr1[i];
            obj.visible = arr2[i];
            obj.archived = arr3[i];
            result.push(obj);
        }
        return result;
   };

   let result = createResultObject(categoriesList, visibleQuantity, archivedQuantity);
   
   return result;

};



