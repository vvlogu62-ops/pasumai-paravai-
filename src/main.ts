import './style.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="dashboard">

    <header class="topbar">
      <div class="brand">
        <div class="brand-icon">🌱</div>
        <div>
          <h1>Pasumai Paravai</h1>
          <p>Smart Agricultural Monitoring Dashboard</p>
        </div>
      </div>

      <div class="status">
        <span class="status-dot"></span>
        System Online
      </div>
    </header>

    <main class="content">

      <section class="welcome">
        <div>
          <h2>Welcome to Pasumai Paravai 🚁</h2>
          <p>
            Monitor fields, detect locations and manage agricultural schemes.
          </p>
        </div>

        <label class="upload-btn" for="fieldPhoto">
          📸 Upload Field Photo
        </label>

        <input
          type="file"
          id="fieldPhoto"
          accept="image/*"
          hidden
        />
      </section>

      <section class="stats">

        <div class="card">
          <span>🌾</span>
          <h3>24</h3>
          <p>Active Fields</p>
        </div>

        <div class="card">
          <span>📍</span>
          <h3 id="locationCount">18</h3>
          <p>Locations Detected</p>
        </div>

        <div class="card">
          <span>📋</span>
          <h3 id="applicationCount">12</h3>
          <p>Applications</p>
        </div>

        <div class="card">
          <span>🚁</span>
          <h3>5</h3>
          <p>Drone Missions</p>
        </div>

      </section>

      <section class="dashboard-grid">

        <div class="map-card">

          <div class="section-title">
            <h2>🗺️ Live Field Map</h2>
            <span>LIVE</span>
          </div>

          <div
            id="fieldMap"
            style="
              width: 100%;
              height: 360px;
              border-radius: 14px;
              overflow: hidden;
            "
          ></div>

          <button
            id="locationButton"
            class="upload-btn"
            style="margin-top: 15px;"
            type="button"
          >
            📍 Detect My Location
          </button>

          <div id="locationInfo"></div>

          <div id="fieldRecord"></div>

        </div>

        <div class="side-card">

          <div class="section-title">
            <h2>📋 Scheme Status</h2>
          </div>

          <div class="scheme">
            <div>
              <strong>Farmer Application</strong>
              <p>Submitted</p>
            </div>
            <span class="badge success">Approved</span>
          </div>

          <div class="scheme">
            <div>
              <strong>Green Agriculture Scheme</strong>
              <p>Under Review</p>
            </div>
            <span class="badge pending">Pending</span>
          </div>

          <div class="scheme">
            <div>
              <strong>Field Verification</strong>
              <p>Location detected</p>
            </div>
            <span class="badge active">Active</span>
          </div>

        </div>

      </section>

      <section class="disease-card">

        <div class="section-title">
          <h2>🌿 Crop Disease Detection</h2>
          <span>AI DEMO</span>
        </div>

        <p class="disease-description">
          Upload a crop photo to analyze the field condition.
        </p>

        <label class="upload-btn" for="diseasePhoto">
          📷 Upload Crop Photo
        </label>

        <input
          id="diseasePhoto"
          type="file"
          accept="image/*"
          hidden
        />

        <div id="diseasePreview"></div>

        <button
          id="analyzeDisease"
          class="submit-btn"
          type="button"
          disabled
        >
          Analyze Crop
        </button>

        <div
          id="diseaseResult"
          class="disease-result"
          style="display:none"
        ></div>

      </section>

      <section class="bottom-grid">

        <div class="monitor-card">

          <h2>🚁 Drone / Field Monitoring</h2>
          <p>Drone monitoring system</p>

          <div class="progress">
            <div class="progress-bar"></div>
          </div>

          <div class="monitor-info">
            <span>Mission Progress</span>
            <strong>72%</strong>
          </div>

        </div>

        <div class="alert-card">

          <h2>🔔 Alerts</h2>

          <div class="alert">
            <span>⚠️</span>

            <div>
              <strong>Field inspection required</strong>
              <p>3 fields are waiting for verification.</p>
            </div>
          </div>

          <div class="alert">
            <span>📍</span>

            <div>
              <strong>Location detected</strong>
              <p>New field location is ready for review.</p>
            </div>
          </div>

        </div>

      </section>

      <section class="scheme-application">

        <div class="section-title">
          <h2>Government Scheme Application</h2>
          <span>NEW</span>
        </div>

        <form class="application-form" id="applicationForm">

          <div class="form-group">
            <label for="farmerName">Farmer Name</label>
            <input
              id="farmerName"
              type="text"
              placeholder="Enter farmer name"
              required
            />
          </div>

          <div class="form-group">
            <label for="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="tel"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div class="form-group">
            <label for="schemeSelect">Select Scheme</label>

            <select id="schemeSelect" required>
              <option value="">Select a scheme</option>
              <option value="Agriculture Development Scheme">
                Agriculture Development Scheme
              </option>
              <option value="Green Agriculture Scheme">
                Green Agriculture Scheme
              </option>
              <option value="Farmer Support Scheme">
                Farmer Support Scheme
              </option>
            </select>
          </div>

          <button
            id="submitApplication"
            class="submit-btn"
            type="submit"
          >
            Submit Application
          </button>

        </form>

        <div id="applicationResult" style="display:none"></div>

      </section>

    </main>

  </div>
`

// ------------------------------------
// VARIABLES
// ------------------------------------

const photoInput =
  document.querySelector<HTMLInputElement>('#fieldPhoto')

const locationButton =
  document.querySelector<HTMLButtonElement>('#locationButton')

const locationInfo =
  document.querySelector<HTMLDivElement>('#locationInfo')

const locationCount =
  document.querySelector<HTMLHeadingElement>('#locationCount')

const fieldRecord =
  document.querySelector<HTMLDivElement>('#fieldRecord')

const applicationForm =
  document.querySelector<HTMLFormElement>('#applicationForm')

const applicationResult =
  document.querySelector<HTMLDivElement>('#applicationResult')

const applicationCount =
  document.querySelector<HTMLHeadingElement>('#applicationCount')

const farmerName =
  document.querySelector<HTMLInputElement>('#farmerName')

const mobileNumber =
  document.querySelector<HTMLInputElement>('#mobileNumber')

const schemeSelect =
  document.querySelector<HTMLSelectElement>('#schemeSelect')

const diseasePhoto =
  document.querySelector<HTMLInputElement>('#diseasePhoto')

const diseasePreview =
  document.querySelector<HTMLDivElement>('#diseasePreview')

const analyzeDisease =
  document.querySelector<HTMLButtonElement>('#analyzeDisease')

const diseaseResult =
  document.querySelector<HTMLDivElement>('#diseaseResult')

let uploadedPhotoUrl = ''
let currentLatitude: number | null = null
let currentLongitude: number | null = null
let applicationNumber = 1
let diseasePhotoUrl = ''

// ------------------------------------
// CROP PHOTO
// ------------------------------------

diseasePhoto?.addEventListener('change', () => {

  const file = diseasePhoto.files?.[0]

  if (!file || !diseasePreview || !analyzeDisease) return

  if (diseasePhotoUrl) {
    URL.revokeObjectURL(diseasePhotoUrl)
  }

  diseasePhotoUrl = URL.createObjectURL(file)

  diseasePreview.innerHTML = `
    <img
      src="${diseasePhotoUrl}"
      alt="Uploaded crop"
      class="disease-preview-image"
    />
  `

  analyzeDisease.disabled = false

  if (diseaseResult) {
    diseaseResult.style.display = 'none'
  }
})

// ------------------------------------
// AI DISEASE DETECTION
// ------------------------------------

analyzeDisease?.addEventListener('click', async () => {

  const file = diseasePhoto?.files?.[0]

  if (!file || !diseaseResult || !analyzeDisease) {
    return
  }

  analyzeDisease.textContent = 'AI analyzing...'
  analyzeDisease.disabled = true

  try {

    const formData = new FormData()

    formData.append('image', file)

    /*
      IMPORTANT:
      This uses the same online domain.

      If Render backend is deployed separately,
      change this URL to your Render backend URL.
    */

    const response = await fetch(
      '/api/detect-disease',
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error('AI server error')
    }

    const result = await response.json()

    diseaseResult.style.display = 'block'

    diseaseResult.innerHTML = `
      <div class="disease-result-header">

        <strong>
          🤖 AI Detection Result
        </strong>

        <span class="badge pending">
          ${result.status ?? 'Detected'}
        </span>

      </div>

      <div class="disease-info">

        <p>
          <strong>Crop:</strong>
          ${result.crop ?? 'Unknown'}
        </p>

        <p>
          <strong>Detection:</strong>
          ${result.disease ?? 'No disease detected'}
        </p>

        <p>
          <strong>Confidence:</strong>
          ${result.confidence ?? 0}%
        </p>

        <p class="disease-note">
          AI result is for screening/demo purposes.
          Expert verification is recommended.
        </p>

      </div>
    `

  } catch (error) {

    console.error(error)

    diseaseResult.style.display = 'block'

    diseaseResult.innerHTML = `
      <div class="search-error">

        ❌ AI server connection failed.

        <br><br>

        The dashboard is online, but the AI backend
        is not connected yet.

      </div>
    `

  } finally {

    analyzeDisease.textContent = 'Analyze Crop'

    analyzeDisease.disabled = false

  }

})

// ------------------------------------
// APPLICATION
// ------------------------------------

type SavedApplication = {

  id: string
  name: string
  mobile: string
  scheme: string
  status: string
  photoUrl: string
  latitude: number | null
  longitude: number | null

}

const savedApplications: SavedApplication[] = []

function createApplicationId() {

  const year = new Date().getFullYear()

  const number =
    String(applicationNumber).padStart(4, '0')

  applicationNumber++

  return `PP-${year}-${number}`
}

function showApplicationTracking(
  id: string,
  name: string,
  scheme: string
) {

  if (!applicationResult) return

  applicationResult.style.display = 'block'

  applicationResult.innerHTML = `

    <div class="tracking-card">

      <div class="tracking-header">

        <div>

          <strong class="tracking-title">
            Application Submitted
          </strong>

          <p>${name}</p>

        </div>

        <span class="tracking-status">
          SUBMITTED
        </span>

      </div>

      <div class="application-id">

        <strong>Application ID</strong>

        <div>${id}</div>

      </div>

      <div class="tracking-scheme">

        <strong>Scheme</strong>

        <p>${scheme}</p>

      </div>

      <div class="tracking-steps">

        <div class="tracking-step">

          <span>1</span>

          <div>
            <strong>Submitted</strong>
            <p>Application received</p>
          </div>

        </div>

        <div class="tracking-step inactive">

          <span>2</span>

          <div>
            <strong>Under Review</strong>
            <p>Application will be reviewed</p>
          </div>

        </div>

        <div class="tracking-step inactive">

          <span>3</span>

          <div>
            <strong>Field Verification</strong>
            <p>Field location verification</p>
          </div>

        </div>

        <div class="tracking-step inactive">

          <span>4</span>

          <div>
            <strong>Approved</strong>
            <p>Final approval</p>
          </div>

        </div>

      </div>

    </div>
  `
}

// ------------------------------------
// APPLICATION FORM
// ------------------------------------

applicationForm?.addEventListener(
  'submit',
  (event) => {

    event.preventDefault()

    if (
      !farmerName?.value.trim() ||
      !mobileNumber?.value.trim() ||
      !schemeSelect?.value
    ) {

      applicationForm.reportValidity()

      return
    }

    const application: SavedApplication = {

      id: createApplicationId(),

      name: farmerName.value.trim(),

      mobile: mobileNumber.value.trim(),

      scheme: schemeSelect.value,

      status: 'Submitted',

      photoUrl: uploadedPhotoUrl,

      latitude: currentLatitude,

      longitude: currentLongitude

    }

    savedApplications.push(application)

    renderOfficerDashboard()

    showApplicationTracking(
      application.id,
      application.name,
      application.scheme
    )

    if (applicationCount) {
      applicationCount.textContent =
        String(12 + savedApplications.length)
    }

    applicationForm.reset()

  }
)

// ------------------------------------
// TRACK APPLICATION
// ------------------------------------

const searchSection =
  document.createElement('section')

searchSection.className =
  'scheme-application'

searchSection.innerHTML = `

  <div class="section-title">

    <h2>Track Application</h2>

    <span>TRACK</span>

  </div>

  <div class="application-form application-search-form">

    <div class="form-group">

      <label for="searchApplicationId">
        Application ID
      </label>

      <input
        id="searchApplicationId"
        type="text"
        placeholder="Example: PP-2026-0001"
      />

    </div>

    <button
      id="searchApplication"
      class="submit-btn"
      type="button"
    >
      Track Application
    </button>

  </div>

  <div id="searchResult" style="display:none"></div>

`

document
  .querySelector('.content')
  ?.appendChild(searchSection)

const searchInput =
  document.querySelector<HTMLInputElement>(
    '#searchApplicationId'
  )

const searchButton =
  document.querySelector<HTMLButtonElement>(
    '#searchApplication'
  )

const searchResult =
  document.querySelector<HTMLDivElement>(
    '#searchResult'
  )

searchButton?.addEventListener(
  'click',
  () => {

    const searchId =
      searchInput?.value.trim()

    if (!searchId) {

      alert(
        'Please enter an Application ID.'
      )

      return
    }

    const application =
      savedApplications.find(
        (item) =>
          item.id === searchId
      )

    if (!searchResult) return

    searchResult.style.display =
      'block'

    if (!application) {

      searchResult.innerHTML = `
        <div class="search-error">

          Application not found.

          <br>

          Please check the Application ID.

        </div>
      `

      return
    }

    searchResult.innerHTML = `

      <div class="tracking-card search-card">

        <strong class="tracking-title">
          Application Found
        </strong>

        <div class="application-id">

          <strong>Application ID</strong>

          <div>${application.id}</div>

        </div>

        <p>
          <strong>Farmer:</strong>
          ${application.name}
        </p>

        <p>
          <strong>Mobile:</strong>
          ${application.mobile}
        </p>

        <p>
          <strong>Scheme:</strong>
          ${application.scheme}
        </p>

        <div class="tracking-status search-status">

          Status: ${application.status}

        </div>

      </div>

    `
  }
)

// ------------------------------------
// UPDATE SEARCH
// ------------------------------------

function updateSearchResult(
  application: SavedApplication
) {

  if (
    !searchResult ||
    searchInput?.value.trim() !==
      application.id
  ) {

    return
  }

  searchResult.style.display =
    'block'

  searchResult.innerHTML = `

    <div class="tracking-card search-card">

      <strong class="tracking-title">
        Application Found
      </strong>

      <div class="application-id">

        <strong>Application ID</strong>

        <div>${application.id}</div>

      </div>

      <p>
        <strong>Farmer:</strong>
        ${application.name}
      </p>

      <p>
        <strong>Mobile:</strong>
        ${application.mobile}
      </p>

      <p>
        <strong>Scheme:</strong>
        ${application.scheme}
      </p>

      <div class="tracking-status search-status">

        Status: ${application.status}

      </div>

    </div>

  `
}

// ------------------------------------
// OFFICER DASHBOARD
// ------------------------------------

const officerSection =
  document.createElement('section')

officerSection.className =
  'scheme-application'

officerSection.innerHTML = `

  <div class="section-title">

    <h2>Officer Dashboard</h2>

    <span>ADMIN</span>

  </div>

  <div class="officer-summary">

    <div class="officer-metric total">

      <strong>Total Applications</strong>

      <h2 id="officerTotal">0</h2>

    </div>

    <div class="officer-metric submitted">

      <strong>Submitted</strong>

      <h2 id="officerSubmitted">0</h2>

    </div>

    <div class="officer-metric review">

      <strong>Under Review</strong>

      <h2 id="officerReview">0</h2>

    </div>

    <div class="officer-metric approved">

      <strong>Approved</strong>

      <h2 id="officerApproved">0</h2>

    </div>

    <div class="officer-metric rejected">

      <strong>Rejected</strong>

      <h2 id="officerRejected">0</h2>

    </div>

  </div>

  <div
    id="officerApplications"
    class="officer-applications"
  ></div>

`

document
  .querySelector('.content')
  ?.appendChild(officerSection)

function renderOfficerDashboard() {

  const applications =
    savedApplications

  const total =
    document.querySelector<HTMLElement>(
      '#officerTotal'
    )

  const submitted =
    document.querySelector<HTMLElement>(
      '#officerSubmitted'
    )

  const review =
    document.querySelector<HTMLElement>(
      '#officerReview'
    )

  const approved =
    document.querySelector<HTMLElement>(
      '#officerApproved'
    )

  const rejected =
    document.querySelector<HTMLElement>(
      '#officerRejected'
    )

  const list =
    document.querySelector<HTMLElement>(
      '#officerApplications'
    )

  if (!list) return

  if (total) {
    total.textContent =
      String(applications.length)
  }

  if (submitted) {
    submitted.textContent =
      String(
        applications.filter(
          (app) =>
            app.status === 'Submitted'
        ).length
      )
  }

  if (review) {
    review.textContent =
      String(
        applications.filter(
          (app) =>
            app.status === 'Under Review'
        ).length
      )
  }

  if (approved) {
    approved.textContent =
      String(
        applications.filter(
          (app) =>
            app.status === 'Approved'
        ).length
      )
  }

  if (rejected) {
    rejected.textContent =
      String(
        applications.filter(
          (app) =>
            app.status === 'Rejected'
        ).length
      )
  }

  if (applications.length === 0) {

    list.innerHTML = `
      <div class="officer-empty">
        No applications submitted yet.
      </div>
    `

    return
  }

  list.innerHTML =
    applications
      .map((app) => {

        const statusClass =
          app.status === 'Approved'
            ? 'success'
            : app.status === 'Under Review'
              ? 'pending'
              : app.status === 'Rejected'
                ? 'rejected'
                : 'active'

        return `

          <div class="officer-application-row">

            <div>
              <small>Application ID</small>
              <strong>${app.id}</strong>
            </div>

            <div>
              <small>Farmer</small>
              <strong>${app.name}</strong>
            </div>

            <div>
              <small>Scheme</small>
              <strong>${app.scheme}</strong>
            </div>

            <div>
              <small>Status</small>
              <span class="badge ${statusClass}">
                ${app.status}
              </span>
            </div>

            <div class="officer-actions">

              <button
                class="action-review"
                data-id="${app.id}"
                type="button"
              >
                Review
              </button>

              <button
                class="action-approve"
                data-id="${app.id}"
                type="button"
              >
                Approve
              </button>

              <button
                class="action-reject"
                data-id="${app.id}"
                type="button"
              >
                Reject
              </button>

            </div>

          </div>

        `
      })
      .join('')
}

renderOfficerDashboard()

officerSection.addEventListener(
  'click',
  (event) => {

    const target =
      event.target as HTMLElement

    const actionButton =
      target.closest<HTMLButtonElement>(
        'button[data-id]'
      )

    if (!actionButton) return

    const application =
      savedApplications.find(
        (item) =>
          item.id ===
          actionButton.dataset.id
      )

    if (!application) return

    if (
      actionButton.classList.contains(
        'action-review'
      )
    ) {

      application.status =
        'Under Review'

    } else if (
      actionButton.classList.contains(
        'action-approve'
      )
    ) {

      application.status =
        'Approved'

    } else if (
      actionButton.classList.contains(
        'action-reject'
      )
    ) {

      application.status =
        'Rejected'
    }

    renderOfficerDashboard()

    updateSearchResult(application)

  }
)

// ------------------------------------
// FIELD PHOTO
// ------------------------------------

photoInput?.addEventListener(
  'change',
  () => {

    const file =
      photoInput.files?.[0]

    if (!file) return

    if (uploadedPhotoUrl) {
      URL.revokeObjectURL(
        uploadedPhotoUrl
      )
    }

    uploadedPhotoUrl =
      URL.createObjectURL(file)

    document
      .querySelector('#photoPreview')
      ?.remove()

    const preview =
      document.createElement('img')

    preview.id =
      'photoPreview'

    preview.src =
      uploadedPhotoUrl

    preview.alt =
      'Uploaded field photo'

    preview.style.width =
      '100%'

    preview.style.maxHeight =
      '300px'

    preview.style.objectFit =
      'cover'

    preview.style.borderRadius =
      '14px'

    preview.style.marginTop =
      '15px'

    document
      .querySelector('.map-card')
      ?.appendChild(preview)

    updateFieldRecord()

  }
)

// ------------------------------------
// MAP
// ------------------------------------

const defaultLatitude =
  10.9601

const defaultLongitude =
  79.3845

const map =
  L.map('fieldMap').setView(
    [
      defaultLatitude,
      defaultLongitude
    ],
    13
  )

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; OpenStreetMap contributors',

    maxZoom: 19
  }
).addTo(map)

let currentMarker:
  L.Marker | null = null

currentMarker =
  L.marker([
    defaultLatitude,
    defaultLongitude
  ])
    .addTo(map)
    .bindPopup(
      '<strong>Pasumai Paravai Field</strong><br>Monitoring Area'
    )

setTimeout(() => {

  map.invalidateSize()

}, 300)

// ------------------------------------
// FIELD RECORD
// ------------------------------------

function updateFieldRecord() {

  if (
    !fieldRecord ||
    !uploadedPhotoUrl ||
    currentLatitude === null ||
    currentLongitude === null
  ) {

    return
  }

  fieldRecord.innerHTML = `

    <strong>
      ✅ Field Record Ready
    </strong>

    <br>

    Photo and location captured successfully.

    <br><br>

    Latitude:
    ${currentLatitude.toFixed(6)}

    <br>

    Longitude:
    ${currentLongitude.toFixed(6)}

  `

  fieldRecord.style.marginTop =
    '15px'

  fieldRecord.style.padding =
    '15px'

  fieldRecord.style.background =
    '#f0fdf4'

  fieldRecord.style.border =
    '1px solid #bbf7d0'

  fieldRecord.style.borderRadius =
    '10px'

  fieldRecord.style.color =
    '#166534'
}

// ------------------------------------
// LOCATION
// ------------------------------------

locationButton?.addEventListener(
  'click',
  () => {

    if (!navigator.geolocation) {

      alert(
        'Location is not supported by this browser.'
      )

      return
    }

    locationButton.textContent =
      'Detecting location...'

    navigator.geolocation.getCurrentPosition(

      (position) => {

        currentLatitude =
          position.coords.latitude

        currentLongitude =
          position.coords.longitude

        map.setView(
          [
            currentLatitude,
            currentLongitude
          ],
          16
        )

        if (currentMarker) {

          map.removeLayer(
            currentMarker
          )
        }

        currentMarker =
          L.marker([
            currentLatitude,
            currentLongitude
          ])
            .addTo(map)
            .bindPopup(
              '<strong>Your Current Location</strong>'
            )
            .openPopup()

        locationButton.textContent =
          'Location Detected ✅'

        if (locationInfo) {

          locationInfo.innerHTML = `

            <strong>
              📍 Current Location
            </strong>

            <br>

            Latitude:
            ${currentLatitude.toFixed(6)}

            <br>

            Longitude:
            ${currentLongitude.toFixed(6)}

          `

          locationInfo.style.marginTop =
            '15px'

          locationInfo.style.padding =
            '15px'

          locationInfo.style.background =
            '#dcfce7'

          locationInfo.style.borderRadius =
            '10px'

          locationInfo.style.color =
            '#166534'
        }

        if (locationCount) {
          locationCount.textContent =
            '19'
        }

        updateFieldRecord()

      },

      () => {

        locationButton.textContent =
          'Detect My Location'

        alert(
          'Please allow location access in your browser.'
        )

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }

    )

  }
)