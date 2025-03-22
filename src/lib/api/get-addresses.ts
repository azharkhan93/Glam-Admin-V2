import axios from "axios";
import { headers } from "next/headers";

export async function getAddressesServer() {
  try {
    const headerSequence = headers();
    const cookie = headerSequence.get("cookie");

    const { data } = await axios.get("/api/addresses", {
      // headers: {
      //   Cookie: `${cookie}`,
      // },
    });

    console.log("Fetched addresses:", data); // Debugging

    return Array.isArray(data) ? data : []; // Ensure always returning an array
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return []; // Return an empty array on failure to avoid crashes
  }
}

// import axios from "@/config/axios.config";
// import { GuestUserResProps } from "@/lib/types/types";
// import { headers } from "next/headers";

// export async function getAddressesServer() {
//   const headerSequence = headers();
//   const cookie = headerSequence.get("cookie");
//   const { data } = await axios.get("/api/addresses", {
//     headers: {
//       Cookie: `${cookie}`,
//     },
//   });

//   return data as GuestUserResProps;
// }
