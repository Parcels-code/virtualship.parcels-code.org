---
title: 'VirtualShip v1.0 released!'
date: '2026-10-23T11:00:00+02:00'
authors:
  - name: Jamie Atkins
    github: j-atkins
summary: 'We are pleased to announce the release of VirtualShip v1.0!'
---

We are pleased to announce the release of [VirtualShip v1.0](https://github.com/Parcels-code/virtualship/releases)!

v1.0 of the software is the product of more than a year of development by the team. Whereas the previous v0.x versions were part of an 'alpha' development phase, v1.0 marks a platform that is mature, stable and ready for classrooms, professionals and researchers across different institutions, for example as part of the [NKO scale-up project](https://virtualship.parcels-code.org/blog/scaleup-grant).

Working with the rest of the [Parcels](https://parcels-code.org/) team throughout development, VirtualShip v1.0 has migrated to [Parcels v4.0](https://parcels-code.org/blog/parcels-v4). We have benefited hugely from the new features and improvements in Parcels v4, including making our instrument kernels pure-Python and moving closer to the [Pangeo](https://pangeo.io/) ecosystem of python packages like `xarray` and `dask`.

VirtualShip runs in a digital twin of the ocean via the [Copernicus Marine Service](https://marine.copernicus.eu/). The software seamlessly streams the data it needs straight from the Copernicus Marine Data Store, using its cloud-native datasets. This means we have built the VirtualShip platform and its instruments to work with a wide range of variables (physical and biogeochemical) and expeditions can take place anywhere in the global ocean, from ~ 30 years ago to the near-present and into forecast periods. If you'd rather work offline, you can still point VirtualShip at local data. In theory, therefore, you can deploy the VirtualShip in any gridded (hydrodynamic) dataset you have access to!

Other nice new features include:

- Biogeochemical sensors for Argo floats, meaning the [BGC-Argo campaign](https://biogeochemical-argo.org/) can now be replicated in VirtualShip.
- More realistic expedition planning, including time at waypoints that depends on real-life conditions such as seafloor depth (if you're using an instrument that needs to be winched to the seafloor!), and Argo floats behave sensibly in shallow water.
- Closer integration with the [Marine Facilities Planning (MFP)](https://nioz.marinefacilitiesplanning.com/cruiselocationplanning#) tooling, making the integration between VirtualShip and the real-world expedition planning workflow even more seamless.
- A "[Real Life Challenges](https://virtualship.readthedocs.io/en/latest/user-guide/user-profiles/educators/train-the-teacher/train_the_teacher.html#simulating-real-life-challenges)" module. Real expeditions rarely go exactly to plan. VirtualShip can now simulate "problems" during an expedition, such as equipment faults, logistical challenges. Students/practitioners learn to adapt their plans, just as they would on board. _Tip: Watch out for unexpected dolphin encounters!_

We have also made an effort to make VirtualShip more accessible to a wider audience, including:

- A revamped documentation site, with new entry points for Educators, Learners, Researchers and Developers. Check it out [here](https://virtualship.readthedocs.io/en/latest/user-guide/index.html)!
- A sibling [virtualship-workspace](https://github.com/Parcels-code/virtualship-workspace) repository, dedicated to hosting pre-configured cloud-based programming environments for VirtualShip simulations and data post-processing. This allows users to use VirtualShip without needing to install anything locally, and is especially useful for teaching and workshops.
- An interactive, snappy, terminal-based planning tool (`virtualship plan`), so users can design an expedition, choose instruments and sensors, and have the schedule checked as you go, without having to edit config files by hand.

VirtualShip is available through `conda-forge`. See [here](https://virtualship.readthedocs.io/en/latest/#installation) for installation instructions.

We're always interested in new collaborations and applications, in teaching, professional training and research. If any of this sounds relevant to your work, please get in touch! Via email ([virtualship@uu.nl](mailto:virtualship@uu.nl)) or open an [issue or discussion on GitHub](https://github.com/Parcels-code/virtualship).

### A personal note from lead developer Jamie Atkins

Today is my last day [as the Captain of the VirtualShip](https://github.com/Parcels-code/virtualship.parcels-code.org/pull/82), so this release is also a bit of a sign-off from me 🙃👨🏼‍✈️

It has been such a pleasure working on this project and I will miss it. My favourite moments have been seeing students use the software and get genuinely excited about their expeditions, and seeing their immersion grow in subsequent courses as the software has matured. I'm proud of where the project has got to and I'm excited to keep an eye on where it goes next in the capable hands of the wider VirtualShip team and my replacement (more on that in a future blog post I should think...!).

I wish the team and the project smooth _sailing_ ahead!

Jamie 🚢
