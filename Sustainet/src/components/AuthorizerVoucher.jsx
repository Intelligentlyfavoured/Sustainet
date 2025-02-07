import React from "react";
import { CheckCircleIcon, XCircleIcon, BellIcon } from "@heroicons/react/solid";

const PaymentVoucher = () => {
  const vouchers = [
    { id: 1, description: "Office Supplies", amount: "$200", status: "pending" },
    { id: 2, description: "Software License", amount: "$500", status: "approved" },
    { id: 3, description: "Travel Reimbursement", amount: "$150", status: "rejected" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payment Voucher</h2>
        <BellIcon className="h-1 w-1 text-yellow-200" />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id} className="text-center">
              <td className="border border-gray-300 p-2">{voucher.description}</td>
              <td className="border border-gray-300 p-2">{voucher.amount}</td>
              <td
                className={`border border-gray-300 p-2 font-semibold ${
                  voucher.status === "approved" ? "text-green-500" :
                  voucher.status === "rejected" ? "text-red-500" :
                  "text-yellow-500"
                }`}
              >
                {voucher.status}
              </td>
              <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                <button className="text-green-500 hover:text-green-700">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentVoucher;
