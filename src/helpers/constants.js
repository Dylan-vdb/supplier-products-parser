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

export const syntechUnwantedSubstrings = [
  'Coming Soon',
  // 'On Promotion',
  'Just Arrived',
  'Unboxed',
  'Last Chance',
  'Apparel',
  'Hydroponics',
  ' > Mounts and Brackets',
  ' > Screen Protectors',
  ' > Cables',
  ' > Tools',
  ' > Mounts and Brackets',
  ' > Screen Protectors',
  ' > Mobile Devices > Stylus',
  ' > Smart Security',
  ' > Scooters and Bikes',
  ' > Wearables > Accessories',
  ' > Lifestyle Accessories'
]

export const micropointUnwantedSubstrings = [
  'MERCUSYS',
  'ACCESS POINT',
  'AA STOCK CLEARANCE >',
  'BATTERIES >',
  'BLUETOOTH DEVICES >',
  'BUNDLES >',
  'CAMERAS >',
  'CARTRIDGES >',
  'CASES >',
  'CCTV >',
  'CONSUMABLES >',
  'CONVERTER BOXES >',
  'DESKTOP MACHINE >',
  'DVI PRODUCTS >',
  'EXTENDERS >',
  'EXTERNAL ENCLOSURES >',
  'FANS >',
  'FLEA MARKET >',
  'FOR SUPPLIER STOCK PURPOSES >',
  'HARD DRIVES > NOTE BOOK DRIVE CADDY',
  'HARD DRIVES > REFURBISHED STOCK',
  'HARD DRIVES > SUPPLIER STOCK',
  'HEALTHCARE >',
  'KVM SWITCHES >',
  'LAN PRODUCTS >',
  'LOGITECH >',
  'MEDIA PLAYERS >',
  'MINING >',
  'MT-VIKI >',
  'MULTIPLUGS >',
  'NETWORK CABLE >',
  'NETWORKING > ADSL MODEMS / ROUTERS',
  'NETWORKING > CABLES',
  'NETWORKING > CAT6 CABLES',
  'NETWORKING > KVM SWITCHES',
  'NETWORKING > MEDIA CONVERTERS',
  'NETWORKING > POWER OF ETHERNET',
  'NETWORKING > USB',
  'NOT FOR LISTING >',
  'NOTEBOOK BAGS > CAMERA',
  'NOTEBOOKS > REFURBISHED STOCK',
  'NOTEBOOKS > WARRANTY',
  'OPTICAL DRIVES >',
  'ORICO ITEMS >',
  'PARTS >',
  'PARTS FOR REPAIRING >',
  'POINT OF SALE >',
  'POWER SUPPLY >',
  'PRINTERS >',
  'PROCESSORS > THERMAL PASTE',
  'PROJECTORS >',
  'REFURBISHED >',
  'ROUTERS >',
  'SANITIZER >',
  'SERVERS >',
  'SLEEVE >',
  'SOLID STATE DRIVE >',
  'TOOLS >',
  'TP-LINK >',
  'TRANSMITTERS >',
  'TV >',
  'WARRANTY >',
  'MICROSOFT > SERVER',
  'PHILIPS >',
  'PHONES >',
  'PROCESSORS >',
  'UPS > ACCESSORIES',
  'MOUSE > GAMING',
  'MOUSE > ACCESSORIES',
  'MEMORY > MEMORY'
  // /mouse > $/giu
]

export const micropointCategoryReplacements = [
  ['ADAPTERS >', `Peripherals > Adapters >`],
  ['ADD-ON CARDS >', 'Components > Expansion and PCIe Adapters >'],
  ['ANCILLARY ITEMS >', 'Gadgets >'],
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
  ['NETAC > FLASH DRIVES', 'Peripherals > Storage > Flash Drives'],
  ['NETAC > MICRO SD', 'Peripherals > Storage > Micro SD'],
  ['NETAC > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives'],
  ['NETAC > 2.5" SSD', 'Components > Solid State Drives > Consumer'],
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
  [/^MONITORS >.*/giu, 'Components > Software'],
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
  ['TABLETS >', 'Tablets >'],
  [/^UPS > \d+VA *\w*$/giu, 'Power Solutions > PC UPS'],
  ['UPS > INVERTER', 'Power Solutions > Inverters'],
  [/^USB \w*DEVICES > \w* *\w*$/giu, 'Peripherals > USB Devices'],
  ['USB ADDON DEVICES > (BLUETOOTH|NETWORK|SOUND)', 'Peripherals > USB Devices'],
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

export const astrumCategoryReplacements = [
  ['Headphones', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
  ['Earbuds', 'Peripherals > Computer Audio > Headsets > In-Ears '],
  ['Toner Cartridges', 'Printers > Toner Cartridges'],
  ['Laptop Keyboards', 'Components > Notebook Keyboards'],
  ['Laptop Batteries', 'Components > Notebook Batteries'],
  ['Power Banks', 'Power Solutions > Power Banks'],
  ['Laptop Bags', 'Accessories > Bags and Covers > Bags >'],
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
  ['Cleaning Solutions', 'Acessories > Cleaning Solutions'],
  ['Gadgets', 'Gadgets'],
  ['FM Modulators', 'Gadgets > FM Modulators'],
  ['Gaming Products', 'Peripherals > Gaming'],
  ['Laptop Chargers', 'Components > Notebook Chargers'],
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
  ['Hard Drive', 'Components > Hard Drives'],
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
