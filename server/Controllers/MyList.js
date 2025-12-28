import { MyListModel } from "../Models/MyList.js";

export const addtoMyList = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      oldprice,
      brand,
      discount,
    } = req.body;

    const Item = await MyListModel.findOne({
      userId,
      productId,
    });

    if (Item) {
      return res.status(400).json({
        message: "Item already in MyList",
      });
    }

    const MyList = new MyListModel({
      userId,
      productId,
      productTitle,
      image,
      rating,
      price,
      oldprice,
      brand,
      discount,
    });

    await MyList.save();

    return res.status(200).json({
      data: MyList,
      message: "Product add in MyList successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyList = async (req, res) => {
  try {
    const userId = req.userId;
    const MyListItems = await MyListModel.find({userId});

    if (!MyListItems) {
      return res.status(404).json({
        message: "myList is not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: MyListItems,
      message: "MyList fetched successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const DeleteMyList = async (req, res) => {
  try {
    const deleteMyList = await MyListModel.findByIdAndDelete(req.params.id);

    if (!deleteMyList) {
      return res.status(404).json({
        message: "the product in myList is not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: deleteMyList,
      message: "MyList deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
