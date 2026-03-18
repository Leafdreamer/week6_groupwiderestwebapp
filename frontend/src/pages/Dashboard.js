import Layout from "../layout/Layout";
import InventoryCards from "../components/InventoryCards";
import ProductTable from "../components/ProductTable";
import Login from "../components/Login";

export default function Dashboard() {
  return (
    <Layout>
        {/* <Login/> */}
      <InventoryCards />

      <ProductTable />
    
    </Layout>
  );
}
