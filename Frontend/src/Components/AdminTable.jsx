import { convertToDate } from "../Converter/Converter";

export default function AdminTable({ data }) {
  return (
    <table className="table-auto custom-border border-separate rounded-xl text-lg w-full bg-gray-100">
      <thead>
        <tr className="font-bold">
          <td>ID</td>
          <td>Username</td>
          <td>Fullname</td>
          <td>Email</td>
          <td>Date Of Birth</td>
          <td>Address</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {data.map((value) => {
          return (
            <tr key={value.userId}>
              <td className="font-bold">{value.userId}</td>
              <td>{value.username}</td>
              <td>{value.fullname}</td>
              <td>{value.email}</td>
              <td>{convertToDate(value.dateOfBirth)}</td>
              <td>{value.address}</td>
              <td>
                <button className="text-white bg-red-700 rounded-md cursor-pointer px-2 py-1 hover:text-black hover:bg-red-100">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
