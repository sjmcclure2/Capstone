export const aircraft = [
  {
    id: 850080,
    status: 'NMCMC',
    fuel_quant: 180,
    operating_hrs: 120124,
    location: 'B1',
    driver: {
      jcn: 22123001,
      acft_id: 850080,
      mx_etic_start: new Date(),
      mx_etic: new Date(),
      etic_update: 3,
      discrepancy: 'Rt o/b hydro pump leaking beyond limits',
      corrective_action: '',
      symbol: 'X',
      wuc: '11TAG',
      shop: 'Hydro',
      prd: false,
      is_complete: false,
      is_sched_insp: false
    },
    last_flight: new Date(),
    next_flight: new Date(),
    noseart: 'http://3.bp.blogspot.com/-VZydzMuu2RI/VoVxfgZ551I/AAAAAAAAtMg/T7S1Lpp7DiM/s640/Sentimental%2BJourney%2Bwith%2BBetty%2BGrable.jpg'
  },
  {
    id: 860140,
    status: 'FMC',
    fuel_quant: 165,
    operating_hrs: 100424,
    location: '2BN',
    driver: {
      jcn: 22123004,
      acft_id: 860140,
      mx_etic_start: new Date(),
      mx_etic: new Date(),
      etic_update: 0,
      discrepancy: 'FEB panel missing 1 ea fastner',
      corrective_action: '',
      symbol: "/",
      wuc: '12AAF',
      shop: 'APG',
      prd: false,
      is_complete: false,
      is_sched_insp: false
    },
    last_flight: new Date(),
    next_flight: new Date(),
    noseart: 'https://c8.alamy.com/comp/CTDK5E/miss-pick-up-nose-art-on-a-canadian-vickers-pvb-1a-canso-flying-boat-CTDK5E.jpg'
  },
  {
    id: 850077,
    status: 'PMC',
    fuel_quant: 195,
    operating_hrs: 100122,
    location: 'Dock 2',
    driver: {
      jcn: 22123006,
      acft_id: 850077,
      mx_etic_start: new Date(),
      mx_etic: new Date(),
      etic_update: 1,
      discrepancy: 'Auto-pilot disengages randomly',
      corrective_action: '',
      symbol: "/",
      wuc: '13JJY',
      shop: 'IFC',
      prd: true,
      is_complete: false,
      is_sched_insp: false
    },
    last_flight: new Date(),
    next_flight: new Date(),
    noseart: 'https://thumbs.dreamstime.com/z/flying-tiger-world-war-ii-american-fighter-airplane-painted-nose-art-painted-aluminum-flying-tiger-warbird-noseart-173758345.jpg'
  },
]

export const imdsSpoof = [
  {
    jcn: 22123001,
    acft_id: 850080,
    mx_etic_start: new Date(),
    mx_etic: new Date(),
    etic_update: 0,
    discrepancy: 'Rt o/b hydro pump leaking beyond limits',
    corrective_action: '',
    symbol: 'X',
    wuc: '11TAG',
    shop: 'Hydro',
    prd: false,
    is_complete: false,
    is_sched_insp: false
  },
  {
    jcn: 22123004,
    acft_id: 860140,
    mx_etic_start: new Date(),
    mx_etic: new Date(),
    etic_update: 0,
    discrepancy: 'FEB panel missing 1 ea fastner',
    corrective_action: '',
    symbol: '/',
    wuc: '12AAF',
    shop: 'APG',
    prd: false,
    is_complete: false,
    is_sched_insp: false
  },
  {
    jcn: 22123006,
    acft_id: 850077,
    mx_etic_start: new Date(),
    mx_etic: new Date(),
    etic_update: 1,
    discrepancy: 'Auto-pilot disengages randomly',
    corrective_action: '',
    symbol: '/',
    wuc: '13JJY',
    shop: 'IFC',
    prd: true,
    is_complete: false,
    is_sched_insp: false
  },
]

export const sorties = [
  {
    id: 1,
    launch_location: 8,
    parking_location: 8,
    tail_number: 850080,
    callsign: 'BoneRanger',
    hours_scheduled: 4,
    hours_flown: null,
    projected_launch: new Date('May 9, 2022 08:45:00'),
    actual_launch: null,
    projected_land: new Date('May 9, 2022 12:45:00'),
    actual_land: null,
    landing_status: null,
    deviations: null,
    crew_ready: null,
    crew_show: null,
    eng_start: null,
    taxi: null,
    req_fuel: 180
  },
  {
    id: 2,
    launch_location: 4,
    parking_location: 4,
    tail_number: 850077,
    callsign: 'B-One-R',
    hours_scheduled: 3,
    hours_flown: null,
    projected_launch: new Date('May 9, 2022 07:00:00'),
    actual_launch: null,
    projected_land: new Date('May 9, 2022 10:00:00'),
    actual_land: null,
    landing_status: null,
    deviations: null,
    crew_ready: null,
    crew_show: null,
    eng_start: null,
    taxi: null,
    req_fuel: 150
  },
  {
    id: 3,
    launch_location: 8,
    parking_location: 8,
    tail_number: 850080,
    callsign: 'Strike-2',
    hours_scheduled: 2,
    hours_flown: null,
    projected_launch: new Date('May 9, 2022 15:30:00'),
    actual_launch: null,
    projected_land: new Date('May 9, 2022 17:30:00'),
    actual_land: null,
    landing_status: null,
    deviations: null,
    crew_ready: null,
    crew_show: null,
    eng_start: null,
    taxi: null,
    req_fuel: 130
  },
  {
    id: 4,
    launch_location: 3,
    parking_location: 3,
    tail_number: 860140,
    callsign: 'Last Lancer',
    hours_scheduled: 5,
    hours_flown: null,
    projected_launch: new Date('May 10, 2022 06:15:00'),
    actual_launch: null,
    projected_land: new Date('May 10, 2022 11:15:00'),
    actual_land: null,
    landing_status: null,
    deviations: null,
    crew_ready: null,
    crew_show: null,
    eng_start: null,
    taxi: null,
    req_fuel: 195
  },
]
//3,4
export const locations = [
  {
    id: 3,
    location: 'Bravo 1',
  },
  {
    id: 4,
    location: '2BN',
  },
  {
    id: 8,
    location: 'Dock 2',
  }
]

export const notes = [
  {
    id: 1,
    jcn: 22123001,
    note: "Hydro shop has id'd the leak and is statusing parts",
    created_at: new Date('May 9, 2022 08:45:00'),
    updated_ad: new Date('May 9, 2022 10:12:00'),
    is_active: true
  },
  {
    id: 2,
    jcn: 22123001,
    note: "There are no pumps in supply. Part has been MICAPed with EDD of 29 May",
    created_at: new Date('May 9, 2022 08:45:00'),
    updated_ad: new Date('May 9, 2022 10:12:00'),
    is_active: true
  },
  {
    id: 3,
    jcn: 22123001,
    note: "On hold for down time.",
    created_at: new Date('May 9, 2022 08:45:00'),
    updated_ad: null,
    is_active: true
  },
  {
    id: 4,
    jcn: 22123001,
    note: "While troubleshooting IFC found multiple bad cannon plugs with loose connections.",
    created_at: new Date('May 9, 2022 08:45:00'),
    updated_ad: new Date('May 9, 2022 10:12:00'),
    is_active: true
  },
  {
    id: 5,
    jcn: 221230001,
    note: 'IFC cannot duplicate. ETIC updated.',
    created_at: new Date('May 9, 2022 08:45:00'),
    updated_at: null,
    is_active: true 
  },
]