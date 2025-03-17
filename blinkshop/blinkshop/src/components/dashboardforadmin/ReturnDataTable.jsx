import React from "react";
import { useDashboard } from "./DashboardContext";
const ReturnDataTable = () => {
  // Assume that returnData comes from your BioContext
  const { returndata } = useDashboard();

  if (!returndata || returndata.length === 0) {
    return <p className="text-center mt-4">No return data available.</p>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Table Headers */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered At</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered At</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subreason</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Option</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {returndata.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 text-sm text-gray-900">{item._id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.userId}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.email}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {Array.isArray(item.address)
                    ? item.address.join(", ")
                    : item.address}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {Array.isArray(item.products) ? (
                    <ul className="list-disc list-inside">
                      {item.products.map((prod, idx) => (
                        <li key={idx}>
                          <strong>Tag:</strong> {prod.tag} | <strong>Price:</strong> {prod.price} |{" "}
                          <strong>Qty:</strong> {prod.quantity} | <strong>Size:</strong> {prod.size}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    item.products
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.status}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {item.orderedAt && new Date(item.orderedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {item.deliveredAt && new Date(item.deliveredAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {item.createdAt && new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.reason}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.subreason}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.selectedOption}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {item.returnDate && new Date(item.returnDate).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {item.updatedAt && new Date(item.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnDataTable;
