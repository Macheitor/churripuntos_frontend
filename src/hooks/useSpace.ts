// import { useEffect, useState } from "react";
// import apiClient from "../services/api-client";
// import { CanceledError } from "axios";

// const useSpace = (spaceId: string) => {
//   useEffect(() => {
//     const controller = new AbortController();
//     apiClient
//       .get<FetchGetSpaceResponse>(`/spaces/${spaceId}`, {
//         signal: controller.signal,
//       })
//       .then((res) => setSpaces(res.data.space))
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//       });
//     return () => controller.abort();
//   }, []);
//   return { space, error };
// };

// export default useSpace;
