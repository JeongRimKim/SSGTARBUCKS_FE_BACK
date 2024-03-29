import { json, useLoaderData,NavLink } from 'react-router-dom';
import { getAuthToken } from '../util/auth';
// axios import 
import axios from 'axios';


function IncomeListPage() {
  const incomeList = useLoaderData();
  console.log("IncomeListPage, incomeList >>>>>>>>>>>>.", incomeList);

  return (
    <>
      <h1>입고목록</h1>
      <table border="1">
        <thead>
          <tr>
            <th></th>
            <th>번호</th>
            <th>입고번호</th>
            <th>입고코드</th>
            <th>입고일자</th>
            <th>입고총개수</th>
            <th>입고상태</th>
            <th>입고목록번호</th>
            <th>입고상품개수</th>
            <th>입고상품번호</th>
            <th>입고상품유통기한</th>
            <th>입고상품명</th>
          </tr>
        </thead>
        <tbody>
          {incomeList.map((incomeItem, index) => (
            <tr key={`${incomeItem.income_id}-${index}`}>
              <td><input type="checkbox" /></td>
              <td><NavLink to={`inspection/${incomeItem.income_id}`} >{index+1}</NavLink></td>
              <td>{incomeItem.income_id}</td>
              <td>{incomeItem.income_code}</td>
              <td>{incomeItem.income_date}</td>
              <td>{incomeItem.income_amount}</td>
              <td>{incomeItem.income_status}</td>
              <td>{incomeItem.income_list_id}</td>
              <td>{incomeItem.income_list_quantity}</td>
              <td>{incomeItem.item_id}</td>
              <td>{incomeItem.item_exp}</td>
              <td>{incomeItem.product_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

}
export default IncomeListPage;

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// axios 버전
export async function loader({ request }) {
  console.log("IncomeListPage,loader>>>>>>>>>>>>.", request)
  const token = getAuthToken();
  const branch_id = localStorage.getItem("branch_id");
  console.log("token:", token);
  console.log("branch_id:", branch_id);

  const response = await axios({
    method: "GET",
    url: "http://localhost:8000/api/v1/income/list/",
    headers: {
      'Content-Type': 'application/json',
      'jwtauthtoken': token
    },
    params: {
      branch_id: branch_id
    }
  });

  console.log("IncomeListPage.response >>>>>>>>>>>..", response);

  if (response.status !== 200) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  const resData = response.data;
  console.log("resData", resData);
  return resData;
}
