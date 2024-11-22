export const symbolMap = {
  '™': '',
  '∅': '',
  '—': '-',
  '•': '-',
  '‘': "'",
  '₂': '2',
  '¹⁷': ' to the power 17',
  '¹': '1',
  '²': '2',
  '³': '3',
  Ω: 'ohms',
  '±': ' plus or minus ',
  '°': ' deg ',
  '“': '',
  '”': '',
  '″': 'inches ',
  '®': '',
  '©': '',
  '⎓': '',
  '×': 'x',
  '△': '',
  µs: 'microseconds',
  ' ‎': ' ',
  '\u200e': ' ',
  º: 'deg ',
  '.': '.',
  '\u2024': '.',
  '\u2025': '.',
  '\u2019': "'",
  '\u2013': '-',
  '≤': ' less than ',
  '≥': ' greater than ',
  '≦': ' less than or equal to ',
  '≧': ' greater than or equal to ',
  '\u00a0': ' ',
  '\u00e2': '',
  '€': '',
  ª: '',
  '℃': ' degC',
  '℉': ' degF',
  '◦C': ' degC'
}

export const syntechCategoryReplacements = [
  ['Computers & Peripherals', 'Peripherals'],
  ['Consumer Electronics > ', 'Accessories > '],
  ['Peripherals > Desktop Computers > Gaming Desktops', 'Computers > Gaming Desktops'],
  ['Peripherals > Desktop Computers > Office Desktops', 'Computers > Office Desktops'],
  ['Peripherals > Notebooks', 'Notebooks'],
  ['Peripherals > Mini PCs > Barebone Systems', 'Mini PCs > Barebone Systems'],
  ['Peripherals > Mini PCs > Complete Systems', 'Mini PCs > Complete Systems'],
  ['Peripherals > Mousepads', 'Accessories > Mousepads'],
  ['Peripherals > Stands and Cooling', 'Accessories > Stands and Cooling'],
  ['Accessories > Bags and Covers', 'Accessories > Bags and Covers'],
  ['Heating, Cooling, and Air Quality', 'Heating Cooling and Air Quality'],
  ['Appliances > ', 'Gadgets > '],
  [
    'Peripherals > Computer Audio > Headsets',
    'Peripherals > Computer Audio > Headsets > Over-Ears'
  ],
  ['Accessories > Headphones > ', 'Peripherals > Computer Audio > Headsets > '],
  ['Accessories > Lighting', 'Gadgets > Lighting'],
  ['Accessories > Portable Printing > Printers', 'Printers > Portable Printers'],
  [
    'Accessories > Portable Printing > Printing Consumables',
    'Printers > Portable Printers > Consumables'
  ],
  ['Accessories > Speakers', 'Peripherals > Computer Audio > Speakers'],
  [
    'Accessories > Media and Streaming > Adapters and Converters',
    'Peripherals > Adapters > Display Adapters'
  ],
  ['Networking & Security > ', 'Networking > ']
]

/** TODO
Apple Sync and Charge	-- replace with --	Apple > Cables
Apple iPad  Screen Protectors	-- replace with --	Apple > Apple Accessories
Apple iPad Accessories	-- replace with --	Apple > Apple Accessories
Apple iPad Covers	-- replace with --	Apple > Apple Accessories,Bags Cases & Covers 
Apple iPad Mini Accessories	-- replace with --	Apple > Apple Accessories
Apple iPad Mini Covers	-- replace with --	Apple > Apple Accessories,Bags Cases & Covers 
Apple iPad Mini Scrn Protect	-- replace with --	Apple > Apple Accessories
Bluetooth Adaptors	-- replace with --	Peripherals > USB Devices
Bluetooth Car Kits	-- replace with --	Gadgets > FM Modulators
Bluetooth Earphones	-- replace with --	Peripherals > Computer Audio > Headsets > In-Ears 
Bluetooth Gadgets 	-- replace with --	Gadgets
Bluetooth Headset	-- replace with --	Peripherals > Computer Audio > Headsets > Over-Ears 
Bluetooth Hi-Fi Systems	-- replace with --	Peripherals > Computer Audio > Bluetooth Hi-Fi’s
Bluetooth Keyboards	-- replace with --	Peripherals > Keyboards > Office Keyboards
Bluetooth Mouse	-- replace with --	Peripherals > Mouses > Office Mouses
Bluetooth Party Speakers	-- replace with --	Peripherals > Computer Audio > Speakers
Bluetooth SoundBars	-- replace with --	Peripherals > Computer Audio > Sound Bars
Bluetooth Speakers	-- replace with --	Peripherals > Computer Audio > Speakers
Broadband Routers -3G/LTE	-- replace with --	Networking & Wifi > Routers & Mesh
Broadband Routers -Gigabit	-- replace with --	Networking & Wifi > Routers & Mesh
Business Range Notebook 	-- replace with --	Notebooks > Office Notebooks
CCTV (Accessories)	-- replace with --	CCTV > Accessories
CCTV (Bullet Type Camera)	-- replace with --	CCTV > Bullet Cameras
CCTV (CCD Camera)	-- replace with --	CCTV > CCD Cameras
CCTV (Camera Housings)	-- replace with --	CCTV > Camera Housings
CCTV (Camera Lenses)	-- replace with --	CCTV > Camera Lenses
CCTV (Camera brackets)	-- replace with --	CCTV > Camera Brackets
CCTV (DVR Microphone)	-- replace with --	CCTV > DVR Microphones
CCTV (DVR) DIY Combo Kit	-- replace with --	CCTV > DIY Combo Kits
CCTV (DVR) Stand Alone	-- replace with --	CCTV > Stand Alone Systems
CCTV (Dome Camera)	-- replace with --	CCTV > Dome Cameras
CCTV (Embedded DVR's)	-- replace with --	CCTV > Embedded DVR’s
CCTV (Ground Loop Isolator)	-- replace with --	CCTV > Ground Loop Isolators
CCTV (PC Based DVR Cards)	-- replace with --	CCTV > PC Based DVR Cards
CCTV (PTZ Camera)	-- replace with --	CCTV > PTZ Camera
CCTV (Software)	-- replace with --	CCTV > Software, Software
CCTV Accessories	-- replace with --	CCTV > Accessories
CCTV BNC Connector	-- replace with --	CCTV > BNC Connectors
CCTV Cables	-- replace with --	CCTV > Cables
CCTV IP Server	-- replace with --	CCTV > IP Servers
CCTV Video Baluns	-- replace with --	CCTV > Video Baluns
CCTV(Power Supplies)	-- replace with --	CCTV > Power Supplies
CD / DVD Cases	-- replace with --	Storage Media > CD's & DVD's
CD/DVD Wallet 	-- replace with --	Storage Media > CD's & DVD's
CPU Heat sink and Fan-AMD	-- replace with --	Desktop Components > Cooling > CPU Cooling
CPU Heat sink and Fan-Hybrid	-- replace with --	Desktop Components > Cooling > CPU Cooling
CPU Heat sink and Fan-Intel	-- replace with --	Desktop Components > Cooling > CPU Cooling
CPU Mobile	-- replace with --	Notebook Components > CPU
CPU Thermal Paste	-- replace with --	Peripherals > Consumables
CPU-AMD Ryzen 5	-- replace with --	Desktop Components >CPU > AMD CPU
Cable Clips 	-- replace with --	Cables > Accessories
Cable Management 	-- replace with --	Cables > Accessories
Cable Ties	-- replace with --	Cables > Accessories
Cable: Adaptors & Convertors	-- replace with --	Connectors Adaptors & Converters
Cable: Audio Visual 	-- replace with --	Connectors Adaptors & Converters
Cable: DVI	-- replace with --	Cables > DVI Cable
Cable: HDMI	-- replace with --	Cables > HDMI Cables
Cable: IDE/EIDE	-- replace with --	Cables > IDE Cables
Cable: Monitor 	-- replace with --	Cables > Monitor Cables
Cable: OTG	-- replace with --	Cables > OTG
Cable: Power	-- replace with --	Cables > Power,Power Solutions > Power Cables
Cable: Printer	-- replace with --	Cables > Printer Cables
Cable: SCSI	-- replace with --	Cables > SCSI Cables
Cable: Serial ATA	-- replace with --	Cables > Sata Data + Power
Cable: USB	-- replace with --	Cables > USB Cables
Cable: USB 3.1	-- replace with --	Cables > USB Cables
Cable: USB Extension 	-- replace with --	Cables > USB Cables
Cable: VGA	-- replace with --	Cables > VGA Cables
Cable: VGA Extension	-- replace with --	Cables > VGA Cables
Computer Case	-- replace with --	Desktop Cases > Office Desktop Cases
Computer Case (Chassis)	-- replace with --	Desktop Cases > Office Desktop Cases
Computer Case (Mid-Tower)	-- replace with --	Desktop Cases > Office Desktop Cases
Controller (RAID)	-- replace with --	Desktop Components > Expansion & Pcie Adapters
Controller (SATA)	-- replace with --	Desktop Components > Expansion & Pcie Adapters
Controller (USB 3.1)	-- replace with --	Desktop Components > Expansion & Pcie Adapters > USB
Controller (USB)	-- replace with --	Desktop Components > Expansion & Pcie Adapters > USB
Desktop Microphone	-- replace with --	Peripherals > Computer Audio > Microphones
Desktop Systems- All in One	-- replace with --	Desktop Computers > Office Desktops
Desktop Systems-Branded	-- replace with --	Desktop Computers > Office Desktops
Desktop Systems-Mini PC’s	-- replace with --	Mini PC’s > Complete Systems

 */



export const syntechUnwantedSubstrings = [
  'Coming Soon',
  // 'On Promotion',
  // 'Just Arrived', // GO
  'Unboxed',
  'Last Chance',
  'Apparel',
  'Hydroponics',
  // ' > Mounts and Brackets', // GO
  // ' > Screen Protectors', // GO
  // ' > Cables', // GO
  // ' > Tools', // GO
  ' > Mobile Devices > Stylus'
  // ' > Smart Security', // GO
  // ' > Scooters and Bikes', // GO
  // ' > Wearables > Accessories', // GO
  // ' > Lifestyle Accessories' // GO
]
// SM4447AE7L7
export const micropointUnwantedSubstrings = [
  'PHABLETS',
  'MERCUSYS',
  'ACCESS POINT', //  A mix of incorrect categories
  'AA STOCK CLEARANCE >',
  // 'BATTERIES >', // GO
  'BLUETOOTH DEVICES >', // Only one product a bluetooth dongle
  'BUNDLES >',
  'CAMERAS >',
  // 'CARTRIDGES >', // GO
  // 'CASES >', // GO
  'CCTV >', // GO ISSUES come back to this
  // 'CONSUMABLES >', // GO
  'CONVERTER BOXES >',
  // 'DESKTOP MACHINE >', // GO
  'DVI PRODUCTS >', // GO Only one product probably a discontinued category
  // 'EXTENDERS >', // GO
  // 'EXTERNAL ENCLOSURES >', // GO
  // 'FANS >', // GO
  'FLEA MARKET >',
  'FOR SUPPLIER STOCK PURPOSES >',
  'HARD DRIVES > NOTE BOOK DRIVE CADDY',
  'HARD DRIVES > REFURBISHED STOCK',
  'HARD DRIVES > SUPPLIER STOCK', // Look
  'HARD DRIVES > 2.5" BRACKETS', // GO Just one product
  // 'HEALTHCARE >', // GO
  // 'KVM SWITCHES >', // GO
  // 'LAN PRODUCTS >', // GO
  'LOGITECH >',
  'MEDIA PLAYERS >',
  'MINING >',
  'MT-VIKI >',
  // 'MULTIPLUGS >', // GO Power Solutions
  'NETWORK CABLE >', // Look
  'NETWORKING > ADSL MODEMS / ROUTERS',
  'NETWORKING > CABLES',
  'NETWORKING > CAT6 CABLES',
  // 'NETWORKING > KVM SWITCHES', // GO
  'NETWORKING > MEDIA CONVERTERS', // GO Just one product
  'NETWORKING > POWER OF ETHERNET', // GO Just one product
  'NETWORKING > USB', // GO Just one product
  'NOT FOR LISTING >',
  'NOTEBOOK BAGS > CAMERA',
  'NOTEBOOKS > REFURBISHED STOCK',
  'NOTEBOOKS > WARRANTY',
  'OPTICAL DRIVES >',
  'ORICO ITEMS >',
  'PARTS >',
  'PARTS FOR REPAIRING >',
  // 'POINT OF SALE >', // GO
  // 'POWER SUPPLY >', // GO
  'PRINTERS >', // GO Just one product an accessory
  // 'PROCESSORS > THERMAL PASTE', // GO
  // 'PROJECTORS >', // GO
  'REFURBISHED >',
  // 'ROUTERS >', // GO
  'SANITIZER >',
  'SERVERS >', // GO Just one product
  // 'SLEEVE >', // GO
  // 'SOLID STATE DRIVE >', // GO
  'TOOLS >',
  'TP-LINK >',
  'TRANSMITTERS >',
  'TV >', // GO Several really outdated products lots to do with DSTV decoders
  'WARRANTY >',
  'MICROSOFT > SERVER',
  'PHILIPS >',
  'PHONES >',
  'PROCESSORS >', // GO Website has pages and pages of these already
  'UPS > ACCESSORIES',
  // 'MOUSE > GAMING', // GO
  'MOUSE > ACCESSORIES', // GO Just one weird product
  'MEMORY > MEMORY' // GO Just one product
  // /mouse > $/giu
]

export const micropointCategoryReplacements = [
  ['ADAPTERS >', `Peripherals > Adapters >`],
  ['ADD-ON CARDS >', 'Components > Expansion and PCIe Adapters >'],
  ['ANCILLARY ITEMS >', 'Gadgets >'],
  ['APPLE > NOTEBOOK DOCKING STATIONS', 'Components > Apple'],
  ['APPLE >', 'Components > Apple'],
  ['CABLES >', 'Peripherals > Cables >'],
  ['CABLES : MEDIA', 'Peripherals > Cables > Media'],
  ['CABLES : NETWORK', 'Peripherals > Cables > Network'],
  ['CABLES : POWER', 'Peripherals > Cables > Power'],
  ['FLASH DRIVES AND MICRO-SD > FLASH DRIVES', 'Peripherals > Storage > Flash Drives'],
  ['FLASH DRIVES AND MICRO-SD > MICRO SD', 'Peripherals > Storage > Micro SD'],
  ['FLASH DRIVES AND MICRO-SD > USB', 'Peripherals > Storage > Flash Drives'],
  ['GRAPHIC CARDS >', 'Components > Graphics Cards >'],
  ['HARD DRIVES > 2.5" SSD', 'Components > Solid State Drives > Consumer'],
  ['HARD DRIVES > 3.5" SSD', 'Components > Solid State Drives > Consumer'],
  ['HARD DRIVES > 2.5" HDD', 'Components > Disk Drives > Consumer'],
  ['HARD DRIVES > 2.5" SATA HDD', 'Components > Disk Drives > Consumer'],
  ['HARD DRIVES > 3.5" SATA HDD', 'Components > Disk Drives > Consumer'],
  ['HARD DRIVES > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives'],
  ['HARD DRIVES > HDD DOCKING', 'Peripherals > Storage > Enclosures'],
  ['HARD DRIVES > EXTERNAL 2.5"', 'Peripherals > Storage > External Disk Drives'],
  ['NETAC > FLASH DRIVES', 'Peripherals > Storage > Flash Drives'],
  ['NETAC > MICRO SD', 'Peripherals > Storage > Micro SD'],
  ['NETAC > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives'],
  ['NETAC > 2.5" SSD', 'Components > Solid State Drives > Consumer'],
  ['NETAC > NOTEBOOK MEMORY', 'Components > Memory > Notebook Memory'],
  ['NETAC > DESKTOP MEMORY', 'Components > Memory > Notebook Memory'],
  ['NETAC > EXTERNAL 2.5"', 'Peripherals > Storage > External Disk Drives'],
  ['HEADSETS > GAMING', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['HEADSETS > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['HEADSETS > SOUND', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['KEYBOARDS > ACCESSORIES', 'Peripherals > Keyboards > Keyboard Accessories'],
  ['KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards'],
  ['KEYBOARDS > BLUETOOTH', 'Peripherals > Keyboards > Office Keyboards'],
  ['KEYBOARDS > CORDER', 'Peripherals > Keyboards > Office Keyboards'],
  ['KEYBOARDS > DESKTOP KEYBOARD', 'Peripherals > Keyboards > Office Keyboards'],
  ['KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards'],
  ['KEYBOARDS > USB', 'Peripherals > Keyboards > Office Keyboards'],
  ['KEYBOARDS > WIRELESS', 'Peripherals > Keyboards > Office Keyboards'],
  ['MEMORY > DESKTOP MEMORY', 'Components > Memory > Desktop Memory'],
  ['MEMORY > FLASH DRIVES', 'Components > Memory > Flash Drives'],
  ['MEMORY > GAMING', 'Components > Memory > Gaming Memory'],
  ['MEMORY > MICRO SD', 'Components > Memory > Micro SD'],
  ['MEMORY > NOTEBOOK MEMORY', 'Components > Memory > Notebook Memory'],
  ['MEMORY > MEMORY >', 'Components > Memory > Notebook Memory'],
  [/^MICROSOFT >.*/giu, 'Components > Software'],
  [/^SOFTWARE >.*/giu, 'Components > Software'],
  [/^MINI PC >.*/giu, 'Mini PCs > Complete Systems'],
  [/^MONITORS >.*/giu, 'Peripherals > Monitors'],
  ['MOTHERBOARDS >', 'Components > Motherboards >'],
  [/^MOUSE > GAMING.*$/giu, 'Peripherals > Mice > Gaming Mice'],
  ['MOUSE > CORDER', 'Peripherals > Mice > Gaming Mice'],
  ['MOUSE > MOUSE PAD', 'Accessories > Mousepads'],
  ['MOUSE > USB', 'Peripherals > Mice > Office Mice'],
  ['MOUSE > WIRED MOUSE', 'Peripherals > Mice > Office Mice'],
  ['MOUSE > WIRELESS MOUSE', 'Peripherals > Mice > Office Mice'],
  ['NETBOOKS > INTEL CELERON', 'Notebooks'],
  ['NOTEBOOKS > ACCESSORIES', 'Accessories > Notebook Accessories'],
  ['NOTEBOOK BAGS > SLEEVE', 'Accessories > Bags and Covers > Sleeves'],
  ['NOTEBOOK BAGS > TABLET  SLEEVES', 'Accessories > Bags and Covers > Sleeves'],
  [/^NOTEBOOK ACCESSORIES >.*/giu, 'Accessories > Notebook Accessories'],
  [/^NOTEBOOK BAGS >\s*\S.*$/giu, 'Accessories > Bags and Covers > Bags'],
  [/^NOTEBOOKS >\s*\S.*$/giu, 'Notebooks'],
  ['NETWORKING > 3G / LTE DEVICES', 'Networking > Portable Routers'],
  ['NETWORKING > ACCESSORIES', 'Networking > Accessories'],
  ['NETWORKING > CONSUMABLES', 'Networking > Consumables'],
  ['NETWORKING > ROUTERS', 'Networking > Routers and Mesh'],
  ['NETWORKING > SWITCHES', 'Networking > Switches'],
  ['SOUND > EARPHONES', 'Peripherals > Computer Audio > Headsets > In-Ears'],
  ['SOUND > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['SOUND > MICROPHONE', 'Peripherals > Computer Audio > Microphones'],
  ['SOUND > SPEAKERS', 'Peripherals > Computer Audio > Speakers'],
  ['SOUND > MP3', 'Gadgets > Audio'],
  [/^SPEAKERS >.*$/giu, 'Peripherals > Computer Audio > Speakers'],
  ['SPLITTERS >', 'Peripherals > Splitters >'],
  ['SWITCHES > ', 'Peripherals > Switches >'],
  ['TABLETS > 12 INCH TABLETS', 'Tablets > 12" Tablets'],
  ['TABLETS >', 'Tablets >'],
  [/^UPS > \d+VA *\w*$/giu, 'Power Solutions > PC UPS'],
  ['UPS > INVERTER', 'Power Solutions > Inverters'],
  [/^USB \w*DEVICES > \w* *\w*$/giu, 'Peripherals > USB Devices'],
  ['USB DEVICES > USB TYPE C', 'Peripherals > USB Devices'],
  [/^USB ADDON DEVICES > (BLUETOOTH|NETWORK|SOUND)/giu, 'Peripherals > USB Devices'],
  [/^USB HUB >\s*\S.*$/giu, 'Peripherals > USB Devices'],
  ['GAMING', 'Gaming'],
  ['ACCESSORIES', 'Accessories'],
  ['BLUETOOTH', 'Bluetooth'],
  ['GADGETS', 'Gadgets'],
  ['CPU FANS', 'CPU Fans'],
  ['DESKTOP MEMORY', 'Desktop Memory'],
  ['INTEL CORE I5', 'Intel Core i5'],
  ['INTEL CORE I7', 'Intel Core i7'],
  ['INTEL CORE I3', 'Intel Core i3'],
  ['INTEL CORE I9', 'Intel Core i9'],
  ['MOUSE PAD', 'Mouse Pad'],
  ['WIRELESS', 'Wireless'],

  [/Peripherals > Cables > HDMI Cables/gi, 'Peripherals > Cables > Media > HDMI'],
  [/HDMI Products > Cables/gi, 'Peripherals > Cables > Media > HDMI'],
  [/HDMI Products > Accessories/gi, 'Peripherals > Cables > Media > HDMI'],
  [/HDMI Products > Consumables/gi, 'Peripherals > Cables > Media > HDMI'],
  [/Peripherals > Cables > Media > HDMI To DVI/gi, 'Peripherals > Adapters > HDMI Adapters'],
  [/Peripherals > Adapters > HDMI$/gi, 'Peripherals > Adapters > HDMI Adapters'],
  [/Peripherals > Cables > Media > HDMI Cables/gi, 'Peripherals > Cables > Media > HDMI'],
  [/Peripherals > Switches >hdmi$/gi, 'Peripherals > Switches > HDMI']
]

export const esquireCategoryReplacements = [
  ['Apple Sync and Charge', 'Apple > Cables'],
  ['Apple iPad Screen Protectors', 'Apple > Apple Accessories'],
  ['Apple iPad Accessories', 'Apple > Apple Accessories'],
  ['Apple iPad Covers', 'Apple > Apple Accessories, Bags Cases & Covers'],
  ['Apple iPad Mini Accessories', 'Apple > Apple Accessories'],
  ['Apple iPad Mini Covers', 'Apple > Apple Accessories, Bags Cases & Covers'],
  ['Apple iPad Mini Scrn Protect', 'Apple > Apple Accessories'],
  ['Bluetooth Adaptors', 'Peripherals > USB Devices'],
  ['Bluetooth Car Kits', 'Gadgets > FM Modulators'],
  ['Bluetooth Earphones', 'Peripherals > Computer Audio > Headsets > In-Ears'],
  ['Bluetooth Gadgets', 'Gadgets'],
  ['Bluetooth Headset', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['Bluetooth Hi-Fi Systems', 'Peripherals > Computer Audio > Bluetooth Hi-Fi’s'],
  ['Bluetooth Keyboards', 'Peripherals > Keyboards > Office Keyboards'],
  ['Bluetooth Mouse', 'Peripherals > Mouses > Office Mouses'],
  ['Bluetooth Party Speakers', 'Peripherals > Computer Audio > Speakers'],
  ['Bluetooth SoundBars', 'Peripherals > Computer Audio > Sound Bars'],
  ['Bluetooth Speakers', 'Peripherals > Computer Audio > Speakers'],
  ['Broadband Routers -3G/LTE', 'Networking > Routers > 3G/LTE Routers'],
  ['Broadband Routers -Gigabit', 'Networking & Wifi > Routers & Mesh'],
  ['Business Range Notebook', 'Notebooks > Office Notebooks'],
  ['CCTV (Accessories)', 'CCTV > Accessories'],
  ['CCTV (Bullet Type Camera)', 'CCTV > Bullet Cameras'],
  ['CCTV (CCD Camera)', 'CCTV > CCD Cameras'],
  ['CCTV (Camera Housings)', 'CCTV > Camera Housings'],
  ['CCTV (Camera Lenses)', 'CCTV > Camera Lenses'],
  ['CCTV (Camera brackets)', 'CCTV > Camera Brackets'],
  ['CCTV (DVR Microphone)', 'CCTV > DVR Microphones'],
  ['CCTV (DVR) DIY Combo Kit', 'CCTV > DIY Combo Kits'],
  ['CCTV (DVR) Stand Alone', 'CCTV > Stand Alone Systems'],
  ['CCTV (Dome Camera)', 'CCTV > Dome Cameras'],
  ['CCTV (Embedded DVR\'s)', 'CCTV > Embedded DVR’s'],
  ['CCTV (Ground Loop Isolator)', 'CCTV > Ground Loop Isolators'],
  ['CCTV (PC Based DVR Cards)', 'CCTV > PC Based DVR Cards'],
  ['CCTV (PTZ Camera)', 'CCTV > PTZ Camera'],
  ['CCTV (Software)', 'CCTV > Software, Software'],
  ['CCTV Accessories', 'CCTV > Accessories'],
  ['CCTV BNC Connector', 'CCTV > BNC Connectors'],
  ['CCTV Cables', 'CCTV > Cables'],
  ['CCTV IP Server', 'CCTV > IP Servers'],
  ['CCTV Video Baluns', 'CCTV > Video Baluns'],
  ['CCTV(Power Supplies)', 'CCTV > Power Supplies'],
  ['CD / DVD Cases', 'Storage Media > CD\'s & DVD\'s'],
  ['CD/DVD Wallet', 'Storage Media > CD\'s & DVD\'s'],
  ['CPU Heat sink and Fan-AMD', 'Desktop Components > Cooling > CPU Cooling'],
  ['CPU Heat sink and Fan-Hybrid', 'Desktop Components > Cooling > CPU Cooling'],
  ['CPU Heat sink and Fan-Intel', 'Desktop Components > Cooling > CPU Cooling'],
  ['CPU Mobile', 'Notebook Components > CPU'],
  ['CPU Thermal Paste', 'Peripherals > Consumables'],
  ['CPU-AMD Ryzen 5', 'Desktop Components >CPU > AMD CPU'],
  ['Cable Clips', 'Cables > Accessories'],
  ['Cable Management', 'Cables > Accessories'],
  ['Cable Ties', 'Cables > Accessories'],
  ['Cable: Adaptors & Convertors', 'Connectors Adaptors & Converters'],
  ['Cable: Audio Visual', 'Connectors Adaptors & Converters'],
  ['Cable: DVI', 'Cables > DVI Cable'],
  ['Cable: HDMI', 'Cables > HDMI Cables'],
  ['Cable: IDE/EIDE', 'Cables > IDE Cables'],
  ['Cable: Monitor', 'Cables > Monitor Cables'],
  ['Cable: OTG', 'Cables > OTG'],
  ['Cable: Power', 'Cables > Power,Power Solutions > Power Cables'],
  ['Cable: Printer', 'Cables > Printer Cables'],
  ['Cable: SCSI', 'Cables > SCSI Cables'],
  ['Cable: Serial ATA', 'Cables > Sata Data + Power'],
  ['Cable: USB', 'Cables > USB Cables'],
  ['Cable: USB 3.1', 'Cables > USB Cables'],
  ['Cable: USB Extension', 'Cables > USB Cables'],
  ['Cable: VGA', 'Cables > VGA Cables'],
  ['Cable: VGA Extension', 'Cables > VGA Cables'],
  ['Computer Case', 'Desktop Cases > Office Desktop Cases'],
  ['Computer Case (Chassis)', 'Desktop Cases > Office Desktop Cases'],
  ['Computer Case (Mid-Tower)', 'Desktop Cases > Office Desktop Cases'],
  ['Controller (RAID)', 'Desktop Components > Expansion & Pcie Adapters'],
  ['Controller (SATA)', 'Desktop Components > Expansion & Pcie Adapters'],
  ['Controller (USB 3.1)', 'Desktop Components > Expansion & Pcie Adapters > USB'],
  ['Controller (USB)', 'Desktop Components > Expansion & Pcie Adapters > USB'],
  ['Desktop Microphone', 'Peripherals > Computer Audio > Microphones'],
  ['Desktop Systems- All in One', 'Desktop Computers > Office Desktops'],
  ['Desktop Systems-Branded', 'Desktop Computers > Office Desktops'],
  ['Desktop Systems-Mini PC\'s', 'Mini PC\'s > Complete Systems'],
  ['Earphones/Earplugs', 'Peripherals > Computer Audio > Headsets > In-Ears'],
  ['Entry-Level Notebook', 'Notebooks > Office Notebooks'],
  ['Ethernet Switches Gigabit', 'Networking & Wifi > Switches'],
  ['Ethernet Switches PoE', 'Networking & Wifi > Switches'],
  ['Games Consoles', 'Gaming > Consoles'],
  ['Gaming Bags', 'Bags Cases & Covers > Backpacks'],
  ['Gaming Chassis', 'Desktop Components > Gaming Desktop Cases'],
  ['Gaming Combo kits', 'Gaming > Keyboards'],
  ['Gaming Console Sony PS5', 'Gaming > Consoles'],
  ['Gaming Console-Accessories', 'Gaming > Accessories'],
  ['Gaming Console-Controllers', 'Gaming > Controllers'],
  ['Gaming Console-Games PS3', 'Gaming > Console Games'],
  ['Gaming Console-Games PS4', 'Gaming > Console Games'],
  ['Gaming Console-Games PS5', 'Gaming > Console Games'],
  ['Gaming Console-Games Xbox', 'Gaming > Console Games'],
  ['Gaming Earphones', 'Gaming > Earphones & Headsets'],
  ['Gaming Headsets', 'Gaming > Earphones & Headsets'],
  ['Gaming Keyboards', 'Gaming > Keyboards'],
  ['Gaming Memory', 'Gaming > Memory'],
  ['Gaming Mice', 'Gaming > Mouses'],
  ['Gaming Modifications', 'Gaming > Accessories'],
  ['Gaming Mouse Pads', 'Gaming > Mouse Pad'],
  ['Gaming Power Supplies', 'Gaming > Power Supplies'],
  ['Gaming Range Notebook', 'Notebooks > Gaming Notebooks'],
  ['Graphics Cards - NVIDIA', 'Desktop Components > Graphics Cards Nvidia Graphics Cards'],
  ['HDMI Adaptors', 'Connectors Adaptors & Converters'],
  ['HDMI Couplers', 'Connectors Adaptors & Converters'],
  ['HDMI Extenders', 'Connectors Adaptors & Converters'],
  ['HDMI Hubs and Switches', 'Peripherals > Switches'],
  ['HDMI, DVI & Displayport', 'Connectors Adaptors & Converters'],
  ['Hard Disk (Enclosures)', 'Storage Media > Enclosures'],
  ['Hard Disk (External)', 'Storage Media > External SSDs'],
  ['Hard Disk (Mobile)', 'Storage Media > Hard Drives'],
  ['Hard Disk (NAS)', 'Storage Media > Hard Drives'],
  ['Hard Disk (SATA)', 'Storage Media > Hard Drives'],
  ['Hard Disk (SSD)', 'Storage Media > Solid State Drives'],
  ['Hard Disk (Surveillance)', 'Storage Media > Hard Drives'],
  ['Hard Disk Docks', 'Connectors Adaptors & Converters'],
  ['Hard Disk(Enterprise)', 'Storage Media > Hard Drives'],
  ['Headphones and Microphones', 'Peripherals > Computer Audio > Headsets with Microphones'],
  ['High-End Notebook', 'Notebooks > Office Notebooks'],
  ['IP Camera', 'CCTV > IP Cameras'],
  ['IP Camera brackets', 'CCTV > Brackets'],
  ['IP Dome Camera', 'CCTV > IP Cameras'],
  ['Ink Cartridges-Generic', 'Printers > Ink Cartridges'],
  ['Ink Cartridges-Original', 'Printers > Ink Cartridges'],
  ['Ink and Toners-Generic', 'Printers > Toner Cartridges'],
  ['Ink and Toners-Original', 'Printers > Toner Cartridges'],
  ['Joysticks and Game Controllers', 'Gaming > Controllers'],
  ['Lady Shavers', 'Gadgets > Personal Care'],
  ['Laminating Pouches', 'Gadgets > Office'],
  ['Laminators', 'Gadgets > Office'],
  ['Laptop Batteries', 'Power Solutions > Notebook Batteries, Notebook Components > Batteries'],
  ['Lithium Battery Charger', 'Power Solutions > Lithium Battery Chargers'],
  ['Media (CD/DVD/Blu-ray)', 'Storage Media > CD\'s & DVD\'s'],
  ['Media Players', 'Gadgets > Media & Streaming > Media Players'],
  ['Mid-Range Notebook', 'Notebooks > Office Notebooks'],
  ['Modem (ADSL)', 'Networking & Wifi > Routers & Mesh'],
  ['Modems 3G, 4G, LTE', 'Networking & Wifi > Routers & Mesh'],
  ['Molex Cables', 'Cables > Molex Cables'],
  ['Monitor Brackets', 'Monitors > Monitor Accessories'],
  ['Monitor LCD LED', 'Monitors > Office Monitors'],
  ['Monitor Touch Screen', 'Monitors > Office Monitors'],
  ['Motherboard-Intel-LGA1151', 'Desktop Components > Motherboards > Intel'],
  ['Motherboard-Intel-LGA1700', 'Desktop Components > Motherboards > Intel'],
  ['Mouse Pad', 'Peripherals > Mouse Pads'],
  ['Multimedia Speakers', 'Gadgets > Media & Streaming > Speakers'],
  ['Multimedia TV/Editing/Decoders', 'Gadgets > Media & Streaming > Television'],
  ['Network Attached Storage NAS', 'Networking & Wifi > Network Attached Storage NAS'],
  ['Network Cameras', 'CCTV > Network Cameras'],
  ['Network Interface Card (NIC)', 'Desktop Components > Expansion & Pcie Adapters > Network'],
  ['Network Video Recorders', 'CCTV > Network Video Recorders'],
  ['Networking (Couplers)', 'Networking & Wifi > Adapters & Converters'],
  ['Networking (KVM Accessories)', 'Networking & Wifi > KVM Switches'],
  ['Networking (KVM Switch)', 'Networking & Wifi > KVM Switches'],
  ['Networking (Misc Equipment)', 'Networking & Wifi > Accessories'],
  ['Networking (Router)', 'Networking & Wifi > Routers & Mesh'],
  ['Networking (Switch)', 'Networking & Wifi > Switches'],
  ['Networking (Wireless)', 'Networking & Wifi > Routers & Mesh'],
  ['Networking Cables-Cat5', 'Networking & Wifi > CAT 5 Cables'],
  ['Networking Cables-Cat6', 'Networking & Wifi > CAT 6 Cables'],
  ['Networking Cables-Cat7', 'Networking & Wifi > CAT 7 Cables'],
  ['Networking Patch Panels', 'Networking & Wifi > Patch Panels'],
  ['Networking RJ45 Rubber Boots', 'Networking & Wifi > Consumables'],
  ['Networking RJ45 connectors', 'Networking & Wifi > Consumables'],
  ['Networking(Media Converters)', 'Networking & Wifi > Adapters & Converters'],
  ['Networking(Powerline)', 'Networking & Wifi > Routers & Mesh'],
  ['NiMh Batteries', 'Power Solutions > Batteries'],
  ['Notebook Accessories', 'Notebook Accessories'],
  ['Notebook Backpacks', 'Bags Cases & Covers > Backpacks'],
  ['Notebook Bags and Cases', 'Bags Cases & Covers'],
  ['Notebook Batteries', 'Notebook Components > Batteries, Power Solutions > Notebook Batteries'],
  ['Notebook Power Adapters', 'Notebook Components > Chargers, Power Solutions > Notebook Chargers'],
  ['Notebook Stand', 'Notebook Components > Stands & Cooling'],
  ['Notebook Trolley Bags', 'Bags Cases & Covers > Trolley Bags'],
  ['OTG (Card Reader)', 'Storage Media > Memory Card Readers'],
  ['Optical Drives CD/DVD/Blu-Ray', 'Storage Media > Optical Drives'],
  ['PC Fan Controllers', 'Desktop Components > Cooling > Fans'],
  ['PCs: Tablet PC', 'Tablets > Accessories'],
  ['PCs: Tablet PC Accessories', 'Tablets > Accessories'],
  ['PCs: Tablet Screen Protectors', 'Tablets > Accessories'],
  ['POS Accessories', 'Point of Sale > Accessories'],
  ['POS CCD Scanners', 'Point of Sale > Scanners'],
  ['POS Cash Drawers', 'Point of Sale > Cash Drawers'],
  ['POS Coin Counter/Sorter', 'Point of Sale > Coin Counter/Sorter'],
  ['POS Counterfeit Detectors', 'Point of Sale > Counterfeit Detectors'],
  ['POS Laser Scanners', 'Point of Sale > Laser Scanners'],
  ['POS Printers', 'Point of Sale > Printers'],
  ['POS Thermal Paper', 'Point of Sale > Thermal Paper'],
  ['Parallel/Serial Cables', 'Cables > Serial Cables'],
  ['Patch Cable-Cat5', 'Networking & Wifi > CAT 5 Cables'],
  ['Point of Sale and Accessories', 'Point of Sale > Accessories'],
  ['Portable Power Stations', 'Power Solutions > Portable Power Stations'],
  ['Portable Speakers', 'Gadgets > Media & Streaming > Speakers'],
  ['Power (Adapter & Power Supply)', 'Power Solutions > AC Adapters'],
  ['Power (Surge Suppressor)', 'Power Solutions > Wall Chargers & Plugs'],
  ['Power (UPS Accessories)', 'Power Solutions > Batteries'],
  ['Power Banks', 'Power Solutions > Power Banks'],
  ['Power Distribution Box', 'Power Solutions > Distribution Box (DB)'],
  ['Power Distribution Unit', 'Power Solutions > Multiplugs'],
  ['Power Inverters', 'Power Solutions > Inverters'],
  ['Power Supply Units(PSU)', 'Power Solutions > Computer Power Supplies'],
  ['Power UPS Unit', 'Power Solutions > PC UPS'],
  ['Power over Ethernet (PoE)', 'Networking & Wifi > Adapters & Converters'],
  ['Printer (Dot Matrix)', 'Printers > Dot Matrix Printers'],
  ['Printer (Inkjet)', 'Printers > Inkjet Printers'],
  ['Printer (Laser Colour)', 'Printers > Laser Printers'],
  ['Printer (Laser)', 'Printers > Laser Printers'],
  ['Printer (Laser) Accessories', 'Printers > Laser Accessories'],
  ['Printer (Multifunction Inkjet)', 'Printers > Inkjet Printers'],
  ['Printer (Multifunction)', 'Printers > Inkjet Printers'],
  ['Printer Ribbons', 'Printers > Cartridges > Ribbon'],
  ['Professional Microphones', 'Peripherals > Computer Audio > Microphones'],
  ['Projector', 'Gadgets > Media & Streaming > Projectors'],
  ['Projector (Accessories)', 'Gadgets > Media & Streaming > Projectors'],
  ['Projector Brackets', 'Gadgets > Media & Streaming > Projectors'],
  ['Projector Lamps', 'Gadgets > Media & Streaming > Projectors'],
  ['Projector Screens', 'Gadgets > Media & Streaming > Projectors'],
  ['RCA Adaptors & Convertors', 'Connectors Adaptors & Converters'],
  ['Range Extenders', 'Networking & Wifi > Range Extenders & Access Points'],
  ['SSD (Enclosures)', 'Storage Media > Enclosures'],
  ['Samsung Galaxy Note Covers', 'Bags Cases & Covers > Tablet Covers'],
  ['Samsung Tab Screen Protectors', 'Tablets > Accessories'],
  ['Security and Alarm Product', 'Gadgets > Smart Security'],
  ['Server', 'Server > Towers'],
  ['Server (Accessories)', 'Server > Accessories'],
  ['Server (Cabinet Accessories)', 'Server > Cabinet Accessories'],
  ['Server (Cabinet)', 'Server > Cabinets'],
  ['Server (Chassis)', 'Server > Tower Cases'],
  ['Server Components', 'Server > Components'],
  ['Smart Home', 'Gadgets > Smart Home'],
  ['Smart watch', 'Gadgets > Wearables'],
  ['Software: Antivirus', 'Software'],
  ['Software: Educational', 'Software'],
  ['Software: Graphics', 'Software'],
  ['Software: Internet Security', 'Software'],
  ['Software: Leisure CD', 'Software'],
  ['Software: Operating System', 'Software'],
  ['Software: PC Games', 'Software'],
  ['Software: Productivity', 'Software'],
  ['Software: Security', 'Software'],
  ['Sound Cards', 'Connectors Adaptors & Converters'],
  ['Surface Switches', 'Power Solutions > Surface Switches'],
  ['Surge Protectors', 'Power Solutions > Multiplugs'],
  ['Sync & Charge Cables', 'Cables > Sync & Charge Cables'],
  ['Toner Cartridges-Generic', 'Printers > Cartridges > Toner Cartridges'],
  ['Toner Cartridges-Original', 'Printers > Cartridges > Toner Cartridges'],
  ['USB (Accessories)', 'Connectors Adaptors & Converters'],
  ['USB (Card Reader)', 'Storage Media > Memory Card Readers'],
  ['USB (Hubs)', 'Peripherals > Hubs & Docking Stations'],
  ['USB Charger', 'Power Solutions > Mobile Chargers'],
  ['USB Ethernet Adaptor', 'Connectors Adaptors & Converters'],
  ['USB Extenders', 'Cables > Extension Cables'],
  ['USB Gadgets', 'Dylan to fix'],
  ['USB Mini Cables', 'Cables > USB Cables'],
  ['Universal Tablet Case', 'Bags Cases & Covers > Cases'],
  ['VGA & RGB Extenders', 'Connectors Adaptors & Converters'],
  ['VGA Card Cooling', 'Desktop Components > Cooling > Graphics Card Cooling'],
  ['Wired Keyboard', 'Peripherals > Keyboards > Office Keyboards'],
  ['Wired Keyboard Mouse Combo', 'Peripherals > Keyboards > Keyboard Combos'],
  ['Wired Mini Mouse', 'Peripherals > Mouses > Office Mouses'],
  ['Wired Mouse', 'Peripherals > Mouses > Office Mouses'],
  ['Wireless Adaptors - PCI / PCI-E', 'Desktop Components > Expansion & Pcie Adapters > PCI-E Cards'],
  ['Wireless Adaptors - PCMCIA', 'Desktop Components > Expansion & Pcie Adapters > PCMCIA'],
  ['Wireless Adaptors - USB', 'Desktop Components > Expansion & Pcie Adapters > USB'],
  ['Wireless Antennas', 'Networking & Wifi > Antennas'],
  ['Wireless Intercom', 'CCTV > Network Cameras'],
  ['Wireless Keyboard', 'Peripherals > Keyboards > Office Keyboards'],
  ['Wireless Keyboard Mouse Combo', 'Peripherals > Keyboards > Keyboard Combos'],
  ['Wireless Mouse', 'Peripherals > Mouses > Office Mouses'],
  ['Access Points, Bridges', 'Networking & Wifi > Routers & Mesh'],
  ['Consumer Battery Charger', 'Power Solutions > Wall Chargers & Plugs'],
  ['Google Nexus Covers', 'Bags Cases & Covers > Tablet Covers'],
  ['Memory (SD Flash)Class 10', 'Storage Media > Flash Drives'],
  ['Memory (USB flash)', 'Storage Media > Flash Drives'],
  ['Memory (USB flash-3.0)', 'Storage Media > Flash Drives'],
  ['Memory (USB flash-3.1)', 'Storage Media > Flash Drives'],
  ['Memory (USB flash-3.2)', 'Storage Media > Flash Drives'],
  ['Memory (USB flash-OTG)', 'Storage Media > Flash Drives'],
  ['Memory (MicroSD Flash)', 'Storage Media > Micro SD'],
  ['Men Shavers', 'Gadgets > Personal Care'],
  ['MultiPlugs and Adaptors', 'Power Solutions > Multiplugs'],
  ['Multimedia Speakers', 'Peripherals > Computer Audio > Speakers'],
  ['Toolkits & Test Equipment', 'Tools'],
  ['Travel Charger Kit', 'Power Solutions > Travel Charger Kits'],
  ['Web Camera', 'Peripherals > Webcams']
]

export const astrumCategoryReplacements = [
  ['Headphones', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['Cooling and Mousepad', 'Accessories > Notebook Accessories'],
  ['Earbuds', 'Peripherals > Computer Audio > Headsets > In-Ears '],
  ['Toner Cartridges', 'Printers > Toner Cartridges'],
  ['Laptop Keyboards', 'Components > Notebook Keyboards'],
  ['Laptop Batteries', 'Power Solutions > Notebook Batteries,Components > Notebook Batteries'],
  ['Laptop Screens', 'Components > Notebook Screens'],
  ['Power Banks', 'Power Solutions > Power Banks'],
  ['Laptop Bags', 'Accessories > Bags and Covers > Bags'],
  ['Mobile Chargers', 'Power Solutions > Mobile Chargers'],
  ['Smart Watches', 'Accessories > Wearables > Bands and Watches'],
  ['Mouse', 'Peripherals > Mice'],
  ['Memory Modules', 'Components > Memory'],
  ['Enclosures', 'Components > Memory > Enclosures'],
  ['Keyboards & Combo', 'Peripherals > Keyboards > Office Keyboard'],
  ['Mobile Holders', 'Gadgets > Mobile Holders'],
  ['Cables', 'Peripherals > Cables'],
  ['Speakers', 'Peripherals > Computer Audio > Speakers'],
  ['Networking', 'Networking'],
  ['SSD DISK DRIVES', 'Components > Solid State Drives > Enterprise'],
  ['Adapters & Converters', 'Peripherals > Adapters & Converters'],
  ['Cleaning Solutions', 'Accessories > Cleaning Solutions'],
  ['Gadgets', 'Gadgets'],
  ['FM Modulators', 'Gadgets > FM Modulators'],
  ['Gaming Products', 'Peripherals > Gaming'],
  ['Laptop Chargers', 'Power Solutions > Notebook Chargers'],
  ['Notebook PC', 'Accessories > Notebook Accessories'],
  ['Tablets PC', 'Tablets'],
  ['USB Peripherals', 'Peripherals > USB Devices']
]

export const frontosaCategoryReplacements = [
  ['Add-On Cards', 'Components > Add-On Cards'],
  ['Bags - Covers', 'Accessories > Bags and Covers'],
  ['Chassis', 'Components > Chassis'],
  ['Consumable', 'Consumables and Cartridges'],
  ['CPU', 'Components > CPU'],
  ['Docking Stations', 'Peripherals > Hubs and Docking Stations'],
  ['External Hard Drives', 'Peripherals > Storage > External SSDs'],
  ['Flash Drives', 'Peripherals > Storage > Flash Drives'],
  ['Game Capture', 'Gaming > Game Video Capture'],
  ['Graphics', 'Components > Graphics Cards'],
  ['Hard Drive', 'Components > Storage Media > Hard Drives'],
  ['Keyboard', 'Peripherals > Keyboards'],
  ['Memory', 'Components > Memory'],
  ['Motherboard', 'Components > Motherboards'],
  ['Mounting Kits', 'Accessories > Mounting Kits'],
  ['Mouse', 'Peripherals > Mice'],
  ['Mousepad', 'Accessories > Mousepads'],
  ['Notebook', 'Notebooks'],
  ['Printer', 'Printers'],
  ['SD Card', 'Peripherals > Storage > Memory Cards'],
  ['Streaming', 'Accessories > Media and Streaming'],
  ['USB Hub', 'Peripherals > Hubs and Docking Stations'],
  ['Webcam', 'Peripherals > Webcams']
]

export const micropointAcronyms = new Set([
  'USB',
  'HDMI',
  'OTG',
  'VGA',
  'DVI',
  'RCA',
  'PS2',
  'PCI-E',
  'PCMCIA',
  'PCI',
  'MSATA',
  'HDD',
  'LDINO',
  'KVM',
  'IDE',
  'SAS',
  'RJ11',
  'CAT',
  'CPU',
  'SSD',
  'AMD',
  'ATI',
  'AM2'
])
