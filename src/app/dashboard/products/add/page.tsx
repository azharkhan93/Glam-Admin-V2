import ProtectedAuth from "@/components/ProtectedAuth/ProtectedAuth";
import AddProductForm from "@/components/forms/products/add-product-form";
import Nav from "@/components/nav/nav";

const AddProduct = () => {
  return (
    <ProtectedAuth>
    <Nav>
      <div className="flex w-full flex-col justify-start">
        <div className="w-full">
          <h1 className="m-2 text-xl font-semibold">Add Product</h1>
          <AddProductForm />
        </div>
      </div>
    </Nav>
    </ProtectedAuth>
  );
};

export default AddProduct;
