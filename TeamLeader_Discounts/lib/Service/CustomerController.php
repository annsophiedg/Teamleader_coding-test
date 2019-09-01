<?php

class CustomerController {

    private $customers;

    /**
     * DiscountController constructor.
     */
    public function __construct($customers)
    {
        $this->customers = json_decode($customers,true);
    }

    /**
     * @return mixed
     */
    public function getCustomerRevenue($id)
    {
        foreach ($this->customers as $c) {
            if ($c['id'] == $id) {
                return $c['revenue'];
            }
        }
    }


}