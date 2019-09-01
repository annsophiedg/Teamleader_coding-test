<?php

require 'bootstrap.php';

$customerController = new CustomerController($customers);
$productController = new ProductController($products);

$order = new Order($o4);

//calculate discounts -----------------------------------

$cust_id = $order->getCustomerId();
$revenue = $customerController->getCustomerRevenue($cust_id);

$order_id = $order->getId();
$order_items = $order->getItems();
$discountController = new DiscountController($order_items,$productController);

//$amount_of_items = $order->getAmountOfItems();

// DISCOUNT CHECK -------------------------------
foreach ($order_items as $item) {
    $quantity = $item['quantity'];

    $prod_id = $item['product-id'];

    $category = $productController->getProductCategory($prod_id);

    $unit_price = $item['unit-price'];

    //check discount 2 -------------------
    if ($quantity > 5 && $category == 2) {
        echo "\r\n\r\nDISCOUNT CHECK 2: \r\n";
        $quantity_discount2 = floor($quantity/6);
        echo "You have " .$quantity_discount2. " free item(s)";
        echo "\r\n--------------- END\r\n";

        //set discount 2 in discountArray
        $discountController->setDiscount2($quantity_discount2,$prod_id,$unit_price);
    }
    // -------------- end check discount 2


    //check discount 3 -------------------
    if ($category == 1) {
        //add every product of category 1 in arr_cat1
        $discountController->setCat1Array($quantity,$unit_price);
    }
    // -------------- end check discount 3
}

echo "\r\n\r\nDISCOUNT CHECK 3: \r\n";
$discountController->setDiscount3();
echo "\r\n--------------- END\r\n";

//check discount 1
echo "\r\n\r\nDISCOUNT CHECK 1: \r\n";
$discountController->setDiscount1($revenue);
echo "\r\n--------------- END\r\n";

//calculate sum of all discounts
$discountController->setTotalDiscount();
$total_discount = $discountController->getTotalDiscount();

//echo "\r\n\r\nORDER DISCOUNTS: \r\n";
$discount_array = $discountController->getDiscountArray();
//var_dump($discount_array);

echo "\r\n\r\nYOU HAVE A TOTAL DISCOUNT OF ".$total_discount. "\r\n";


// ------------------------------ end calculate discounts