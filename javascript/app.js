// problem: user interaction does not provide desired result
// solution: add interactivity so the user can better manage shopping list

var itemInput = document.getElementById("add"); // new item input from user
var addButton = document.getElementsByTagName("button")[0]; // first button (add)
var incompleteListHolder = document.getElementById("incompleteListHolder"); // pending ul
var purchasedListHolder = document.getElementById("purchasedListHolder"); // purchased ul

// New List Item
var createListItem = function ( itemString ) {
  // Create List Item
  var listItem = document.createElement( "li" );

  //input checkbox
  var checkBox = document.createElement( "input" );

  //label
  var label = document.createElement( "label" );

  //input while we edit
  var editInput = document.createElement( "input" );

  //add button (button.edit)
  var editButton = document.createElement( "button" );

  //delete button (button.delete)
  var deleteButton = document.createElement( "button" );

  //each element needs to be modifying
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = itemString;

  //each element needs to be appended 
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add Item
var addItem = function () {
  //when the add button is pressed
  console.log("add item...");
  //create new shopping item with the  text from the user entry
  var listItem = createListItem( itemInput.value );
  //Append listItem to incompleteListHolder   
  incompleteListHolder.appendChild( listItem );
  bindItemEvents(listItem, markAsPurchased);
}

//Edit Pending 
var editItem = function () {
  //when the edit button is pressed
  console.log("edit item...");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  // if the class of the parent is .editMode
  if ( containsClass) {
    //switch from .editMode

    //label text becomes the input's value
    label.innerText = editInput.value;
  } else {
    //else
    //switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}

//Delete an existing shopping item
var deleteItem = function () {
  //when the delete button is pressed
  console.log("delete item...");
  //remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark a shopping item as purchased
var markAsPurchased = function () {
  //when the checkbox is checked
  console.log("item purchased...");
  //append the shopping list item to purchased
  var listItem = this.parentNode;
  purchasedListHolder.appendChild( listItem );
  bindItemEvents(listItem, markAsPending);
}

//Mark a shopping item as Pending
var markAsPending = function () {
  //when the checkbox is unchecked
  console.log("item not purchased...");
  //append the task list item to the pending ul
  var listItem = this.parentNode;
  incompleteListHolder.appendChild( listItem );
  bindItemEvents(listItem, markAsPurchased);
}


//set the click handler to the addItem function 
addButton.onclick = addItem;


var bindItemEvents = function (shoppingListItem, checkBoxEventHandler) {
  console.log("Bind item events...");
  // select its children
  var checkBox = shoppingListItem.querySelector("input[type=checkbox]");
  var editButton = shoppingListItem.querySelector("button.edit");
  var deleteButton = shoppingListItem.querySelector("button.delete");

  //bind editItem to edit button
  editButton.onclick = editItem;

  //bind deleteItem to delete button
  deleteButton.onclick = deleteItem;

  //bind markAsPurchased to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteListHolder ul list
for (var i=0; i < incompleteListHolder.children.length; i++) {
    //bind events to list item's children (markAsPurchased)
    bindItemEvents(incompleteListHolder.children[i], markAsPurchased);
}

// cycle over purchasedListHolder ul list
for (var i = 0; i < purchasedListHolder.children.length; i++) {
    //bind events to list item's children (markAsPending)
    bindItemEvents(purchasedListHolder.children[i], markAsPending);
}

