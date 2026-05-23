const API = "https://presensi-barcode.vercel.app/api";

const form = document.getElementById("studentForm");

const studentList = document.getElementById("studentList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nis = document.getElementById("nis").value;

  const name = document.getElementById("name").value;

  const student_class =
    document.getElementById("student_class").value;

  const response = await fetch(
    `${API}/students/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nis,
        name,
        student_class,
      }),
    }
  );

  const data = await response.json();

  alert("Siswa berhasil ditambahkan");

  getStudents();

  form.reset();
});

async function getStudents() {

  const response = await fetch(
    `${API}/students`
  );

  const students = await response.json();

  studentList.innerHTML = "";

  students.forEach((student) => {

    studentList.innerHTML += `
    
      <div class="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition">

      <div class="flex justify-between items-start mb-4">

        <div>

          <h2 class="text-xl font-bold text-gray-800">
            ${student.name}
          </h2>

          <p class="text-gray-500">
            ${student.class}
          </p>

        </div>

        <span class="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
          ${student.nis}
        </span>

      </div>

      <img
        src="${student.qr_code}"
        class="w-40 mx-auto my-4"
      />

      <a
        href="${student.qr_code}"
        download="${student.name}.png"
        class="block text-center bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-xl font-semibold"
      >
        Download QR
      </a>
      <button
        onclick="deleteStudent(${student.id})"
        class="w-full mt-3 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-xl font-semibold"
      >
        Hapus
      </button>

    </div>

    `;
  });
}

getStudents();

//form import
const importForm =
document.getElementById("importForm");

importForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const file =
      document.getElementById("excelFile")
      .files[0];

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      `${API}/import`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    alert(data.message);

    getStudents();

  }
);

//download QR
function downloadQRByClass() {

  const selectedClass =
    document.getElementById("filterClass")
    .value;

  if (!selectedClass) {

    alert("Pilih kelas dulu");

    return;
  }

  window.open(
  `${API}/download-qr/${encodeURIComponent(selectedClass)}`,
  "_blank"
  );

}


//delete student
async function deleteStudent(id) {

  const confirmDelete =
    confirm("Yakin ingin menghapus siswa?");

  if (!confirmDelete) return;

  const response = await fetch(
    `${API}/students/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  alert(data.message);

  getStudents();

}

window.deleteStudent = deleteStudent;