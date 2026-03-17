import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <div className="card p-4 shadow">

        <h2>Course Details (ID: {id})</h2>

        <p>This is where full course info will be shown.</p>

      </div>
    </div>
  );
}

export default CourseDetails;