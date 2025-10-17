import React from "react";

export default function OfficeBearers() {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="/img/taspef-logo.png"
              alt="TASPEF Logo"
              className="h-24 mx-auto mb-4"
            />
            <h1 className="text-red-800 text-2xl font-bold mb-2">
              TAMIL NADU ASSOCIATION OF SENIOR PROFESSIONALS OF ENVIRONMENT AND
              FORESTS
            </h1>
            <h2 className="text-blue-900 text-xl mb-2">TASPEF</h2>
            <p className="text-gray-700">REGN. NO. 270/2007 DATED 10.09.2007</p>
          </div>

          {/* Patron */}
          <div className="text-center mb-8">
            <h3 className="text-blue-900 text-xl font-bold mb-1">
              Thiru. Srinivas R.Reddy, I.F.S.
            </h3>
            <p className="text-blue-800">
              Principal Chief Conservator of Forests (HoFF),<br></br>Tamilnadu Forest
              Department.
            </p>
            <p className="text-blue-800 font-bold">PATRON</p>
          </div>

          {/* Office Bearers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="text-center">
              <h3 className="text-blue-900 text-lg font-bold">
                Mr V. Prabhakaran
              </h3>
              <p className="text-blue-800">IFS, APCCF (Retd)</p>
              <p className="text-blue-900">Executive President</p>
            </div>
            {/* Right Column */}
            <div className="text-center">
              <h3 className="text-blue-900 text-lg font-bold">MR D. Arun</h3>
              <p className="text-blue-800">IFS, CF (Retd)</p>
              <p className="text-blue-900">General Secretary</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <h3 className="text-blue-900 text-lg font-bold">
                Mr S. Deepalingam
              </h3>
              <p className="text-blue-800">DCF (Retd)</p>
              <p className="text-blue-900">Vice President</p>
            </div>
            <div className="text-center">
              <h3 className="text-blue-900 text-lg font-bold">
                Mr G. Sivagurunathan
              </h3>
              <p className="text-blue-800">ACF (Retd)</p>
              <p className="text-blue-900">Joint Secretary</p>
            </div>
          </div>

          {/* Treasurer */}
          <div className="text-center mb-12">
            <h3 className="text-blue-900 text-lg font-bold">Mr S. Velumani</h3>
            <p className="text-blue-800">IFS, DCF (Retd)</p>
            <p className="text-blue-900">Treasurer</p>
          </div>

          {/* Executive Committee Members */}
          <div className="text-center">
            <h2 className="text-red-800 text-xl font-bold mb-6 underline">
              EXECUTIVE COMMITTEE MEMBERS
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Dr S. Paulraj
                </h3>
                <p className="text-blue-800">IFS, CF (Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Dr V.T. Kandasamy
                </h3>
                <p className="text-blue-800">IFS, APCCF (Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr A.K. Ulaganathan
                </h3>
                <p className="text-blue-800">IFS, APCCF (Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr L. Nadhan
                </h3>
                <p className="text-blue-800">IFS, CF (Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr S. Palanichamy
                </h3>
                <p className="text-blue-800">DCF (Retd) </p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr S. Dhandayuthapani
                </h3>
                <p className="text-blue-800">DCF(Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr G. Ramprasath
                </h3>
                <p className="text-blue-800">AD (Statistics) (Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr M. Anbalagan
                </h3>
                <p className="text-blue-800">DCF(Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr K. Arumugam
                </h3>
                <p className="text-blue-800">ACF(Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr P. Ramachandran
                </h3>
                <p className="text-blue-800"> ACF(Retd)</p>
              </div>
              <div>
                <h3 className="text-blue-900 text-lg font-bold">
                  Mr A. S. Mohanram
                </h3>
                <p className="text-blue-800">DCF(Retd)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
