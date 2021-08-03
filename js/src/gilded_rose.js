function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function updateAgedBrie(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
  if (item.sell_in < 0) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}

// TODO: Need to cleanup the function
function updateBackstagePasses(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sell_in < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sell_in < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    // Sanitize the Items ??

    // Updating Quality
    switch (items[i].name) {
      case "Sulfuras, Hand of Ragnaros":
        break;
      case "Aged Brie":
        updateAgedBrie(items[i]);
        items[i].sell_in = items[i].sell_in - 1;
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        updateBackstagePasses(items[i]);
        items[i].sell_in = items[i].sell_in - 1;
        if (items[i].sell_in < 0) {
          items[i].quality = 0;
        }
        break;
      default:
        // TODO: Default code goes here
        if (items[i].quality > 0) {
          items[i].quality = items[i].quality - 1;
        }
        items[i].sell_in = items[i].sell_in - 1;
        break;
    }
  }
}
