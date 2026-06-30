export const GetStarted = [
  {
    name: 'Learner',
    images: [
      {
        src: '/getstarted/learner/software_gif.gif',
        alt: 'Running the VirtualShip software as a learner',
      },
      {
        src: '/getstarted/learner/Agulhas_plot.png',
        alt: 'Output of a VirtualShip simulation in the Agulhas Region',
      },
      {
        src: '/video-thumbnails/virtualship-demo.jpg',
        modalSrc: '/videos-360/clip1_PelagiaJaccosidedeckHD.mp4',
        modalType: 'video',
        initialYawOffsetDeg: 240,
        alt: '360 video preview from the RV Pelagia deck',
      },
    ],

    text: `VirtualShip supports students with a realistic framework to experience oceanographic fieldwork within a virtual environment.

    The simulated sea-going expeditions allow learners to formulate their own research questions, select cruising routes, and grasp the process of research cruise planning. Just as they would during real-world oceanographic research, students face RLCs ([Real-life challenges](/getstarted/learner/software_gif.gif)), instrument deployment, data collection, and scientific interpretation.

    The resulting numerical ocean simulations can be combined with VirtualShip's [immersive 360° videos and VR material](https://www.youtube.com/@VirtualShipClassroom).

    Using all components of the VirtualShip package qualifies students with conceptual understanding alongside practical awareness of the operational constraints and methodological decisions involved in marine research.

    Get started by preparing your own [expedition plan](https://virtualship.readthedocs.io/en/latest/user-guide/assignments/Research_Proposal_only.html) and then continue to [install](https://virtualship.readthedocs.io/en/latest/#installation) and [run](https://virtualship.readthedocs.io/en/latest/user-guide/quickstart.html) VirtualShip.`,
  },
  {
    name: 'Educator',
    images: [
      {
        src: '/getstarted/educator/CaliforniaUpwelling_plot.png',
        alt: 'Output of a VirtualShip simulation in the California Upwelling System',
      },
      {
        src: '/getstarted/educator/VRclassroom2.JPG',
        alt: 'A photo of students using the VR material in the VirtualShip classroom',
      },
    ],

    text: `VirtualShip provides educators with a modular framework to integrate virtual oceanographic fieldwork into higher education curricula.

    The package combines open educational resources, scientific simulation software, and immersive VR material to support teaching activities ranging from introductory BSc Marine Science courses to advanced data-driven research projects across a range of disciplines. From a four-hour workshop on fieldwork preparation to a four-week course.

    The [VirtualShip Classroom](https://virtualship.readthedocs.io/en/latest/user-guide/teacher-content/index.html) has already been implemented successfully across eight BSc and MSc-level course cycles at Utrecht University and is designed to be adaptable for use beyond Utrecht.

    [Lesson plans](https://edusources.nl/materials/76082735-37b6-4ef2-b782-6903f09b4b1a/virtual-sea-going-marine-science-fieldwork-with-virtualship), [tutorials](https://virtualship.readthedocs.io/en/latest/user-guide/tutorials/index.html), and [assignments](https://virtualship.readthedocs.io/en/latest/user-guide/assignments/index.html) allow instructors to alternately emphasise proposal writing, fieldwork planning, virtual deployments, or data analysis depending on course and cohort objectives.

    If you are implementing VirtualShip or will be doing so in the future, we would be delighted to welcome your contributions (either directly on [GitHub](https://virtualship.readthedocs.io/en/latest/contributing/index.html) or through [edusources](https://edusources.nl/)). They can be in the form of feedback, student output, rubrics or others!`,
  },
  {
    name: 'Researcher',
    images: [
      {
        src: '/getstarted/researcher/running.png',
        alt: 'Researcher running simulation',
      },
      {
        src: '/getstarted/researcher/argo_screenshot.png',
        modalSrc: '/getstarted/researcher/argo_interactive_plot.html',
        alt: 'Interactive Argo profile figure',
      },
      {
        src: '/getstarted/researcher/IMG_DrylabAWvB_DDeck_00_110.jpg',
        modalType: 'panorama',
        alt: 'Researcher VR figure',
      },
      {
        src: '/video-thumbnails/clip3-Pelagia-JanBerend-chemlab.jpg',
        modalSrc: '/videos-360/clip3_PelagiaJanBerendchemlabHD.mp4',
        modalType: 'video',
        initialYawOffsetDeg: 180,
        alt: '360 video preview from the RV Pelagia chemistry lab',
      },
    ],
    text: `Researchers can design, test, and optimise oceanographic sampling strategies with VirtualShip's flexible Python package before going to sea.

    Ocean data is streamed from the Copernicus Marine Data Store. Together with realistic instrument behaviour, this supports both retrospective and near-real-time applications. Researchers can then simulate expeditions anywhere in the global ocean and evaluate different deployment strategies.

    This creates new opportunities for expedition planning, Observation System Simulation Experiments (OSSEs), and more adaptive sampling prospects while reducing costs, logistical hurdles, and the environmental impacts associated with ship time.

    [Current implementations](https://virtualship.readthedocs.io/en/latest/user-guide/documentation/full_sensor_list.html) include instruments such as CTDs, ADCPs, Argo floats, and drifters, with several others in development.

    See [here](https://virtualship.readthedocs.io/en/latest/#installation) for installation instructions and the [Quickstart guide](https://virtualship.readthedocs.io/en/latest/user-guide/quickstart.html) for usage guidelines.

    Researchers are very much encouraged to [contribute](https://virtualship.readthedocs.io/en/latest/contributing/index.html) workflows, instrument modules, and scientific applications to co-develop the VirtualShip ecosystem as open-source software towards virtual marine fieldwork.`,
  },
  {
    name: 'Developer',
    images: [
      {
        src: '/getstarted/developer/rlc_gif.gif',
        alt: 'Screencast of a Real-Life Challenge (RLC) in the VirtualShip software',
      },
      {
        src: '/video-thumbnails/clip4-Pelagia-CTD.jpg',
        modalSrc: '/videos-360/clip4_PelagiaCTDHD.mp4',
        modalType: 'video',
        initialYawOffsetDeg: 180,
        alt: '360 video preview from the RV Pelagia CTD operations',
      },
    ],
    text: `VirtualShip is built as a modular Python framework designed for collaborative development.

    The software uses the open-source Parcels Lagrangian simulations and streams analysis-ready ocean data directly from the Copernicus Marine Data Store. Such a pipeline gives the user scalable and realistic virtual expeditions without the need for large local datasets.

    Developers can prototype new workflows due to the implementation of instruments' behaviour via customisable simulation kernels.

    The project [invites contributions](https://virtualship.readthedocs.io/en/latest/contributing/index.html) from programmers, oceanographers, marine scientists at large, those who work with scientific visualisation, Open Science practitioners, and educational experts. You can also get in touch via email (virtualship@uu.nl)!

    New instrument types, biological or meteorological integrations, visualisation tools, teaching applications, amongst others, can all be incorporated into VirtualShip.`,
  },
]
