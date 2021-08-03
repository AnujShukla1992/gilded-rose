function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const QUALITY_MAX = 50;

const ITEM_LIST = {
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
};

let items = [];


const updateAgedBrie = (item) => {
  if (item.sell_in < 0) {
      item.quality = Math.min(item.quality + 2, QUALITY_MAX);
  } else {
      item.quality = Math.min(item.quality + 1, QUALITY_MAX);
  }
  item.sell_in = item.sell_in - 1;

  return item;
}

// TODO: Need to cleanup the function
const updateBackstagePasses = (item) => {

  // reducing the seel_in beforehand to avoid repetition
  item.sell_in = item.sell_in - 1;
  
  switch (true) {
    case (item.sell_in < 0):
      item.quality = 0;
      break;
    case (item.sell_in < 5):
      item.quality = Math.min(item.quality + 3, QUALITY_MAX);
      break;
    case (item.sell_in < 5):
      item.quality = Math.min(item.quality + 3, QUALITY_MAX);
      break;
    case (item.sell_in < 10):
      item.quality = Math.min(item.quality + 2, QUALITY_MAX);
      break;
    default:
      item.quality = Math.min(item.quality + 1, QUALITY_MAX);
      break;
  }

  return item;
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    // Sanitize the Items ??

    // Updating Quality
    switch (items[i].name) {
      case ITEM_LIST.SULFURAS:
        break;
      case ITEM_LIST.BRIE:
        items[i] = updateAgedBrie(items[i]);
        break;
      case ITEM_LIST.BACKSTAGE_PASSES:
        items[i] = updateBackstagePasses(items[i]);
        break;
      default:
        // TODO: Default code goes here
        if (items[i].quality > 0) {
          items[i].quality = Math.min(items[i].quality - 1, 50);
        }
        items[i].sell_in = items[i].sell_in - 1;
        break;
    }
  }
}
