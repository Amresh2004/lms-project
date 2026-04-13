// import React,{useEffect,useState} from "react";
// import axios from "axios";


// export default function Assignment(){
//   const [data,setData]=useState([]);

//   useEffect(()=>{
//     axios.get("http://localhost:5000/api/submissions")
//       .then(res=>setData(res.data));
//   },[]);

//   return(
//     <div className="container mt-4">
//       <h3>Final Results</h3>

//       <table className="table table-bordered">
//         <thead className="table-primary">
//           <tr>
//             <th>Student</th>
//             <th>Subject</th>
//             <th>Assignment</th>
//             <th>Marks</th>
//             <th>Status</th>
//           </tr>
//         </thead>
        

//         <tbody>
//           {data.map(r=>(
//             <tr key={r._id}>
//               <td>{r.studentName}</td>

//               {/* ⭐ SUBJECT ADD */}
//               <td>{r.assignmentId?.subject}</td>

//               <td>{r.assignmentId?.title}</td>

//               <td>
//                 {r.marks>0 ? r.marks : "Not Given"}
//               </td>

//               <td>
//                 {r.status==="Checked"
//                   ? <span className="badge bg-success">Checked</span>
//                   : <span className="badge bg-warning text-dark">Pending</span>}
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }

import React,{useEffect,useState} from "react";
import axios from "axios";
import colors from "../../components/style/colors";

export default function Assignment(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/submissions")
      .then(res=>setData(res.data));
  },[]);

  // 🎨 Theme styles
  const tableHeadStyle = {
    backgroundColor: colors.primary,
    color: colors.white
  };

  const thStyle = {
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: "center"
  };

  return(
    <div className="container mt-4">
      <h3 className="mb-3">Final Results</h3>

      <table className="table table-bordered shadow-sm">
        <thead style={tableHeadStyle}>
          <tr>
            <th style={thStyle}>Student</th>
            <th style={thStyle}>Subject</th>
            <th style={thStyle}>Assignment</th>
            <th style={thStyle}>Marks</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map(r=>(
            <tr key={r._id}>
              <td>{r.studentName}</td>
              <td>{r.assignmentId?.subject}</td>
              <td>{r.assignmentId?.title}</td>

              <td>
                {r.marks>0 ? r.marks : "Not Given"}
              </td>

              <td>
                {r.status==="Checked"
                  ? <span className="badge bg-success">Checked</span>
                  : <span className="badge bg-warning text-dark">Pending</span>}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}