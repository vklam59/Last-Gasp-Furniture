// Assign function to Make a Purchase button
function buy() {
  let addMore;
  let resume = true;
  let unitPrice = 0;
  let itemName;
  let quantity;
  let priceList = [];
  let unitPriceList = [];
  let itemList = [];
  let qtyList = [];
  let sum = 0;

  // Ask for item desired to be purchased
  do {
    itemName = prompt(
      "What item would you like to buy today: Chair, Recliner, Table or Umbrella?"
    );

    itemName = itemName.toLowerCase();
    if (itemName == null || itemName.length == 0) {
      alert("No input");
      continue;
    } else if (
      itemName !== "chair" &&
      itemName !== "table" &&
      itemName !== "recliner" &&
      itemName !== "umbrella"
    ) {
      alert(
        "Invalid option. Please enter either Chair, Recliner, Table or Umbrella:"
      );
      continue;
    }

    switch (itemName) {
      case "chair":
        unitPrice = 25.5;
        break;
      case "recliner":
        unitPrice = 37.75;
        break;
      case "table":
        unitPrice = 49.95;
        break;
      case "umbrella":
        unitPrice = 24.89;
        break;
      default:
        itemName =
          "Error. Please enter either Chair, Recliner, Table or Umbrella";
        continue;
    }

    // Store item name
    itemList.push(itemName);

    // Store unit price for each
    unitPriceList.push(unitPrice);

    // Ask quantity of item desired to be purchased
    quantity = parseInt(
      prompt(`How many ${itemName}s would you like to buy?`),
      10
    );
    qtyList.push(quantity);

    // Calculate and store the price for the current item
    priceList.push(unitPrice * quantity);

    // If yes return to UI #1, if no proceed
    addMore = prompt("Continue shopping? y/n");
    if (addMore.toLowerCase() == "n") {
      resume = false;
    } else if (addMore.toLowerCase() == "y") {
      resume = true;
    } else if (addMore.toLowerCase() == null || addMore.length == 0) {
      resume = true;
      addMore = "Invalid choice. Please enter y or n.";
    }
  } while (resume);

  // Calculate the total price of each item
  for (i = 0; i < priceList.length; i++) {
    sum += priceList[i];
  }

  // Tax calculation after summing the total for each item
  tax = 0.15 * unitPrice * quantity;

  // Ask for state shipped to
  let shippingCost;
  while (shippingCost == null) {
    state = prompt(
      "Please enter the two letter state abbreviation of shipping address."
    );
    state = state.toUpperCase();

    // Shipping cost based on zone or Subtotal

    switch (state) {
      case "WY":
      case "ND":
      case "SD":
      case "NE":
      case "KS":
      case "MN":
      case "IA":
      case "IL":
      case "WI":
        shippingCost = 0;
        break;
      case "WA":
      case "OR":
      case "ID":
      case "MT":
        shippingCost = 20.0;
        break;
      case "CA":
      case "NV":
      case "UT":
      case "AZ":
      case "CO":
      case "NM":
        shippingCost = 30.0;
        break;
      case "OK":
      case "TX":
      case "LA":
      case "MS":
      case "AL":
      case "TN":
      case "KY":
      case "IN":
      case "OH":
      case "MI":
        shippingCost = 35.0;
        break;
      case "ME":
      case "NH":
      case "VT":
      case "MA":
      case "RI":
      case "CT":
      case "NY":
      case "PA":
      case "NJ":
      case "DE":
      case "MD":
      case "WV":
      case "VA":
      case "NC":
        shippingCost = 45.0;
        break;
      case "GA":
      case "SC":
      case "FL":
        shippingCost = 50.0;
        break;
      default:
        state = "Invalid entry. Please enter two letter state abbreviation.";
        continue;
    }
  }

  // Free shipping for order total over $100
  sum > 100 ? (shippingCost = 0) : shippingCost;

  // Spit data into different invoice lines if customer purchases more than 1 item
  let itemListHtml = "";
  let qtyListHtml = "";
  let unitPriceListHtml = "";
  let priceListHtml = "";

  for (i = 0; i < itemList.length; i++) {
    itemListHtml += itemList[i] + "<br>";
  }

  document.getElementById("item-list").innerHTML = itemListHtml;

  for (i = 0; i < qtyList.length; i++) {
    qtyListHtml += qtyList[i] + "<br>";
  }
  document.getElementById("qty-list").innerHTML = qtyListHtml;

  for (i = 0; i < unitPriceList.length; i++) {
    unitPriceListHtml += "$" + unitPriceList[i] + "<br>";
  }
  document.getElementById("unitPrice-list").innerHTML = unitPriceListHtml;

  for (i = 0; i < priceList.length; i++) {
    priceListHtml += "$" + priceList[i] + "<br>";
  }
  document.getElementById("price-list").innerHTML = priceListHtml;

  // Display Invoice of the transaction
  document.getElementById("purchase").style.display = "none";
  document.getElementById("invoice").style.display = "block";
  document.getElementById("shopAgain").style.display = "block";
  document.getElementById("invoice").innerHTML = `
<table id = "itemInvoice"> 
 <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Price</th>
        </tr>
        <tr>
          <td id="item-list">${itemListHtml}</td>
          <td id="qty-list">${qtyListHtml}</td>
          <td id="unitPrice-list">${unitPriceListHtml}</td>
          <td id="price-list">${priceListHtml}</td>
        </tr>
</table>

<p> <b>Item Total:</b> $${sum.toFixed(2)}</p>
<p> <b>Shipping to ${state}:</b> $${shippingCost}</p>
<p> <b>Subtotal:</b> $${(sum + shippingCost).toFixed(2)}</p>
<p> <b>Tax:</b> $${tax.toFixed(2)} </p>
<p> <b>Invoice Total:</b> $${(sum + shippingCost + tax).toFixed(2)} </p>
`;
}
