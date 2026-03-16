import React from "react";

function Location() {
  return (
    <div className="container my-5">

      {/* Title */}
      <h2 className="text-center fw-bold mb-4">Our Location</h2>

      {/* Map Section */}
      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="shadow rounded overflow-hidden">

            <iframe
              title="map"
              src="https://www.google.com/maps?q=Pune,Maharashtra,India&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Location