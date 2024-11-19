import { WRdataType } from '../../type';

export const dummyWRData: WRdataType[] = [
  {
    wrNo: 'WR-001',
    title: 'Fix leaking pipe',
    area: {
      id: 'area-001',
      name: 'Boiler Room',
      parent: {
        id: 'parent-001',
        name: 'Main Plant',
        parent: null,
      },
    },
    creator: {
      name: 'John Doe',
      designation: {
        title: 'Maintenance Engineer',
        department: {
          name: 'Mechanical',
        },
      },
    },
  },
  {
    wrNo: 'WR-002',
    title: 'Replace broken window',
    area: {
      id: 'area-002',
      name: 'Office Block A',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'Jane Smith',
      designation: {
        title: 'Safety Officer',
        department: {
          name: 'Operations',
        },
      },
    },
  },
  {
    wrNo: 'WR-003',
    title: 'Inspect conveyor belt',
    area: {
      id: 'area-003',
      name: 'Assembly Line',
      parent: {
        id: 'parent-001',
        name: 'Main Plant',
        parent: null,
      },
    },
    creator: {
      name: 'Mark Johnson',
      designation: {
        title: 'Supervisor',
        department: {
          name: 'Production',
        },
      },
    },
  },
  {
    wrNo: 'WR-004',
    title: 'Repair ceiling fan',
    area: {
      id: 'area-004',
      name: 'Cafeteria',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'Rahat',
      designation: {
        title: 'Electrical Technician',
        department: {
          name: 'Electrical',
        },
      },
    },
  },
  {
    wrNo: 'WR-005',
    title: 'Calibrate pressure gauge',
    area: {
      id: 'area-005',
      name: 'Control Room',
      parent: {
        id: 'parent-001',
        name: 'Main Plant',
        parent: null,
      },
    },
    creator: {
      name: 'David Wilson',
      designation: {
        title: 'Instrumentation Engineer',
        department: {
          name: 'Instrumentation',
        },
      },
    },
  },
  {
    wrNo: 'WR-006',
    title: 'Clean air vents',
    area: {
      id: 'area-006',
      name: 'Warehouse',
      parent: {
        id: 'parent-003',
        name: 'Storage Area',
        parent: null,
      },
    },
    creator: {
      name: 'Sophia Taylor',
      designation: {
        title: 'Environmental Specialist',
        department: {
          name: 'Safety',
        },
      },
    },
  },
  {
    wrNo: 'WR-007',
    title: 'Replace fuse box',
    area: {
      id: 'area-007',
      name: 'Parking Lot',
      parent: {
        id: 'parent-003',
        name: 'Storage Area',
        parent: null,
      },
    },
    creator: {
      name: 'Liam Brown',
      designation: {
        title: 'Electrical Engineer',
        department: {
          name: 'Electrical',
        },
      },
    },
  },
  {
    wrNo: 'WR-008',
    title: 'Upgrade server rack',
    area: {
      id: 'area-008',
      name: 'IT Server Room',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'Olivia Anderson',
      designation: {
        title: 'IT Manager',
        department: {
          name: 'IT',
        },
      },
    },
  },
  {
    wrNo: 'WR-009',
    title: 'Lubricate machine bearings',
    area: {
      id: 'area-009',
      name: 'Machine Shop',
      parent: {
        id: 'parent-001',
        name: 'Main Plant',
        parent: null,
      },
    },
    creator: {
      name: 'Noah Martin',
      designation: {
        title: 'Maintenance Technician',
        department: {
          name: 'Mechanical',
        },
      },
    },
  },
  {
    wrNo: 'WR-010',
    title: 'Test fire alarm system',
    area: {
      id: 'area-010',
      name: 'Main Lobby',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'Mia Thompson',
      designation: {
        title: 'Safety Engineer',
        department: {
          name: 'Safety',
        },
      },
    },
  },
  {
    wrNo: 'WR-011',
    title: 'Inspect HVAC filters',
    area: {
      id: 'area-011',
      name: 'Laboratory',
      parent: {
        id: 'parent-003',
        name: 'Research Center',
        parent: null,
      },
    },
    creator: {
      name: 'Ava Garcia',
      designation: {
        title: 'Facility Manager',
        department: {
          name: 'Operations',
        },
      },
    },
  },
  {
    wrNo: 'WR-012',
    title: 'Patch drywall cracks',
    area: {
      id: 'area-012',
      name: 'Conference Room',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'William Martinez',
      designation: {
        title: 'Civil Engineer',
        department: {
          name: 'Construction',
        },
      },
    },
  },
  {
    wrNo: 'WR-013',
    title: 'Paint walls',
    area: {
      id: 'area-013',
      name: 'Hallway B',
      parent: {
        id: 'parent-002',
        name: 'Administrative Building',
        parent: null,
      },
    },
    creator: {
      name: 'Rahat',
      designation: {
        title: 'Painter',
        department: {
          name: 'Maintenance',
        },
      },
    },
  },
  {
    wrNo: 'WR-014',
    title: 'Reprogram PLC',
    area: {
      id: 'area-014',
      name: 'Automation Control',
      parent: {
        id: 'parent-001',
        name: 'Main Plant',
        parent: null,
      },
    },
    creator: {
      name: 'James Clark',
      designation: {
        title: 'Automation Specialist',
        department: {
          name: 'Instrumentation',
        },
      },
    },
  },
  {
    wrNo: 'WR-015',
    title: 'Replace fire extinguisher',
    area: {
      id: 'area-015',
      name: 'Generator Room',
      parent: {
        id: 'parent-003',
        name: 'Storage Area',
        parent: null,
      },
    },
    creator: {
      name: 'Isabella Rodriguez',
      designation: {
        title: 'Safety Inspector',
        department: {
          name: 'Safety',
        },
      },
    },
  },
];
