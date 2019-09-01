<?php

class Order {

    private $id;
    private $customer_id;
    private $items;
    private $amount_of_items = 0;
    private $total;
    private $discount;

    /**
     * Order constructor.
     * @param $order
     */
    public function __construct($order)
    {
        $order = json_decode($order,true);

        $this->id = $order['id'];
        $this->customer_id = $order['customer-id'];
        $this->items = $order['items'];
        $this->total = $order['total'];

        $this->setAmountOfItems();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getCustomerId()
    {
        return $this->customer_id;
    }

    /**
     * @return mixed
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * @return mixed
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @return mixed
     */
    public function getAmountOfItems()
    {
        return $this->amount_of_items;
    }

    /**
     * @param mixed $amount_of_items
     */
    public function setAmountOfItems(): void
    {
        foreach ($this->items as $item) {
            $this->amount_of_items += $item['quantity'];
        }
    }

    /**
     * @return mixed
     */
    public function getDiscount()
    {
        return $this->discount;
    }

    /**
     * @param mixed $discount
     */
    public function setDiscount($discount): void
    {
        $this->discount = $discount;
    }


}