// import { imageList } from "@/components/productsroll";

const products = [
  {
    name: "Suit Dress",
    price: "$50",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/suit2.jpeg",
        alt: "Model wearing a black tailored suit dress.",
      },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "navy", name: "Navy", classes: "bg-blue-900 checked:outline-blue-900" },
      { id: "gray", name: "Gray", classes: "bg-gray-400 checked:outline-gray-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A sleek suit-style dress that merges formalwear and fashion-forward design.",
    highlights: [
      "Tailored fit with lapel collar",
      "Lightweight stretch fabric",
      "Versatile day-to-night look",
    ],
    details: "A versatile piece that transitions seamlessly from professional settings to evening occasions. Pair with heels or loafers depending on the mood.",
  },

  {
    name: "Corset Dress",
    price: "$40",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/corset2.jpeg",
        alt: "Corset dress in pastel pink.",
      },
    ],
    colors: [
      { id: "pink", name: "Pink", classes: "bg-pink-200 checked:outline-pink-400" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "An elegant corset-inspired dress with a flattering structured bodice.",
    highlights: [
      "Lace-up corset front",
      "Soft satin fabric",
      "Perfect for evening occasions",
    ],
    details: "Crafted to define the waist while providing comfort—ideal for formal dinners and nights out. Hand-wash or delicate cycle recommended.",
  },

  {
    name: "Casual Dress",
    price: "$30",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/casual2.jpeg",
        alt: "Casual midi dress in beige.",
      },
    ],
    colors: [
      { id: "beige", name: "Beige", classes: "bg-yellow-100 checked:outline-yellow-400" },
      { id: "lightblue", name: "Light Blue", classes: "bg-blue-200 checked:outline-blue-400" },
      { id: "olive", name: "Olive", classes: "bg-green-700 checked:outline-green-700" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A comfortable everyday dress perfect for brunch, errands, or lounging.",
    highlights: [
      "Relaxed silhouette",
      "Breathable cotton blend",
      "Machine washable",
    ],
    details: "An easygoing dress designed for daily wear—soft, low-maintenance, and flattering in relaxed fits.",
  },

  {
    name: "Cocktail Dress",
    price: "$60",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/cocktail2.jpeg",
        alt: "Cocktail dress in emerald green.",
      },
    ],
    colors: [
      { id: "emerald", name: "Emerald Green", classes: "bg-green-600 checked:outline-green-600" },
      { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A stunning cocktail dress designed for parties, weddings, and special nights out.",
    highlights: [
      "Slim fit with side slit",
      "Luxurious satin finish",
      "Adjustable straps",
    ],
    details: "Made to stand out with a satin sheen and flattering slit—designed for long evenings and photo-ready moments.",
  },

  {
    name: "Backless Dress",
    price: "$70",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/backless3.jpeg",
        alt: "Backless silk dress in silver.",
      },
    ],
    colors: [
      { id: "silver", name: "Silver", classes: "bg-gray-200 checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "champagne", name: "Champagne", classes: "bg-yellow-50 checked:outline-amber-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A daring backless dress crafted for elegance and modern minimalism.",
    highlights: [
      "Deep open back",
      "Flowing maxi cut",
      "Perfect for evening wear",
    ],
    details: "Minimalist silhouette with dramatic back detail—best with low-back undergarments and simple jewelry.",
  },

  {
    name: "Bandeau Dress",
    price: "$35",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/bandeau2.jpeg",
        alt: "Bandeau mini dress in white.",
      },
    ],
    colors: [
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "coral", name: "Coral", classes: "bg-pink-300 checked:outline-pink-400" },
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A strapless bandeau dress that’s chic and easy to style for casual or semi-formal looks.",
    highlights: [
      "Elasticated strapless neckline",
      "Slim bodycon fit",
      "Stretch cotton fabric",
    ],
    details: "Comfort-first bandeau with stretch fabric—great for summer nights and layered looks with a jacket.",
  },

  {
    name: "Denim Dress",
    price: "$45",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/denim2.jpeg",
        alt: "Blue denim dress with pockets.",
      },
    ],
    colors: [
      { id: "lightblue", name: "Light Blue", classes: "bg-blue-200 checked:outline-blue-400" },
      { id: "darkblue", name: "Dark Blue", classes: "bg-blue-800 checked:outline-blue-800" },
      { id: "blackdenim", name: "Black Denim", classes: "bg-gray-800 checked:outline-gray-800" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A timeless denim dress that’s versatile enough for casual daywear or street style fits.",
    highlights: [
      "Button-down front",
      "Classic denim wash",
      "Durable cotton denim",
    ],
    details: "Hard-wearing denim with practical pockets—perfect for layering and everyday wear. Machine washable on cold.",
  },

  {
    name: "Bodycon Dress",
    price: "$55",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/bodycon2.jpeg",
        alt: "Black bodycon dress on mannequin.",
      },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
      { id: "royalblue", name: "Royal Blue", classes: "bg-blue-800 checked:outline-blue-800" },
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A figure-hugging bodycon dress designed to accentuate your silhouette.",
    highlights: [
      "Stretch fabric",
      "Above-knee length",
      "Perfect for parties",
    ],
    details: "High-stretch fabric gives a snug fit while allowing movement—pair with statement heels for a night out.",
  },

  {
    name: "Blazer Dress",
    price: "$65",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/blazer2.jpeg",
        alt: "White blazer dress with gold buttons.",
      },
    ],
    colors: [
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "beige", name: "Beige", classes: "bg-yellow-100 checked:outline-yellow-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A chic blazer dress that blends power dressing with feminine style.",
    highlights: [
      "Double-breasted button design",
      "Structured shoulders",
      "Mid-thigh length",
    ],
    details: "Power dressing reimagined—wear solo or with tights for a sharp, modern silhouette. Dry clean for best results.",
  },

  {
    name: "Maxi Dress",
    price: "$75",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/maxi2.jpeg",
        alt: "Floral printed maxi dress.",
      },
    ],
    colors: [
      { id: "floral", name: "Floral Print", classes: "bg-rose-100 checked:outline-rose-400" },
      { id: "navy", name: "Navy", classes: "bg-blue-800 checked:outline-blue-800" },
      { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A flowing maxi dress that offers elegance and comfort for any season.",
    highlights: [
      "Floor-length design",
      "Breathable fabric",
      "Available in floral prints",
    ],
    details: "Flowing silhouette with lightweight fabric—great for outdoor events and travel. Comes in multiple prints.",
  },

  {
    name: "Mini Dress",
    price: "$25",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/mini2.jpeg",
        alt: "Mini dress in soft lavender.",
      },
    ],
    colors: [
      { id: "lavender", name: "Lavender", classes: "bg-purple-200 checked:outline-purple-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "pink", name: "Pink", classes: "bg-pink-200 checked:outline-pink-400" },
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A flirty mini dress that’s fun, stylish, and versatile for everyday looks.",
    highlights: [
      "Above-the-knee cut",
      "Stretch jersey fabric",
      "Perfect for summer outings",
    ],
    details: "Lightweight and playful—easy to dress up with accessories or keep casual with sneakers.",
  },

  {
    name: "Shirt Dress",
    price: "$20",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/shirt2.jpeg",
        alt: "Striped shirt dress in blue.",
      },
    ],
    colors: [
      { id: "bluestripe", name: "Blue Stripe", classes: "bg-blue-100 checked:outline-blue-400" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "olive", name: "Olive", classes: "bg-green-700 checked:outline-green-700" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A lightweight shirt dress with a casual, relaxed vibe for all-day comfort.",
    highlights: [
      "Button-down front",
      "Relaxed oversized fit",
      "Soft cotton blend",
    ],
    details: "Relaxed silhouette ideal for layering—throw on a belt to create shape or wear loose for an oversized look.",
  },

  {
    name: "Flow Dress",
    price: "$80",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/flow2.jpeg",
        alt: "Flowy chiffon dress in pastel tones.",
      },
    ],
    colors: [
      { id: "pastelpink", name: "Pastel Pink", classes: "bg-pink-100 checked:outline-pink-400" },
      { id: "mint", name: "Mint", classes: "bg-green-100 checked:outline-green-400" },
      { id: "cream", name: "Cream", classes: "bg-amber-50 checked:outline-amber-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A free-flowing, ethereal dress perfect for garden parties and outdoor events.",
    highlights: [
      "Chiffon fabric",
      "Floor-length silhouette",
      "Lightweight & breathable",
    ],
    details: "Ethereal chiffon layers for a romantic look—best paired with simple sandals or wedges.",
  },

  {
    name: "T-Shirt Dress",
    price: "$15",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/tshirt2.jpeg",
        alt: "Gray oversized T-shirt dress.",
      },
    ],
    colors: [
      { id: "gray", name: "Gray", classes: "bg-gray-300 checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A casual T-shirt dress that blends comfort and effortless street style.",
    highlights: [
      "Oversized fit",
      "Cotton jersey fabric",
      "Can be styled with sneakers",
    ],
    details: "Budget-friendly staple—ideal for everyday wear, effortless to style and super comfy.",
  },

  {
    name: "Wrap Dress",
    price: "$50",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/wrap2.jpeg",
        alt: "Floral wrap dress in red.",
      },
    ],
    colors: [
      { id: "redfloral", name: "Red Floral", classes: "bg-red-100 checked:outline-red-400" },
      { id: "blue", name: "Blue", classes: "bg-blue-500 checked:outline-blue-500" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A classic wrap dress with a flattering silhouette and adjustable tie waist.",
    highlights: [
      "Adjustable wrap closure",
      "V-neckline",
      "Mid-length hem",
    ],
    details: "Universally flattering wrap design—tie the waist for a custom fit and pair with sandals or boots depending on season.",
  },

  {
    name: "Strapless Dress",
    price: "$60",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/strapless2.jpeg",
        alt: "Black strapless midi dress.",
      },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A strapless dress that’s bold, minimal, and ideal for formal occasions.",
    highlights: [
      "Straight neckline",
      "Fitted bodice",
      "Midi length",
    ],
    details: "Clean, structured strapless silhouette—best with adhesive or strapless-support undergarments for a smooth finish.",
  },

  {
    name: "Custom Dress",
    price: "$100",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/custom2.jpeg",
        alt: "Tailored custom dress sketch.",
      },
    ],
    colors: [
      { id: "custom", name: "Custom", classes: "bg-white checked:outline-gray-400" },
    ],
    sizes: [
      { name: "Custom", inStock: true },
    ],
    description: "A bespoke custom-made dress tailored to your exact measurements and style.",
    highlights: [
      "Handmade to order",
      "Choice of fabric & color",
      "Perfect fit guaranteed",
    ],
    details: "Fully customizable—choose fabric, length, and detailing. Lead times apply depending on complexity.",
  },

  {
    name: "Native Dress",
    price: "$90",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/native4.jpeg",
        alt: "Ankara-inspired native dress.",
      },
    ],
    colors: [
      { id: "ankara", name: "Ankara Print", classes: "bg-red-100 checked:outline-red-400" },
      { id: "kente", name: "Kente", classes: "bg-yellow-600 checked:outline-yellow-600" },
      { id: "adire", name: "Adire", classes: "bg-indigo-800 checked:outline-indigo-800" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A beautifully crafted native-inspired dress celebrating cultural heritage.",
    highlights: [
      "Traditional patterns",
      "Hand-stitched details",
      "Premium fabric blend",
    ],
    details: "Artisan-made with heritage prints and finishing—ideal for cultural events and special occasions.",
  },

  {
    name: "Off-Shoulder Dress",
    price: "$55",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/off1.jpeg",
        alt: "Pink off-shoulder mini dress.",
      },
    ],
    colors: [
      { id: "pink", name: "Pink", classes: "bg-pink-200 checked:outline-pink-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    description: "A chic off-shoulder dress perfect for showcasing an elegant neckline.",
    highlights: [
      "Off-shoulder cut",
      "Elastic neckline",
      "Above-knee design",
    ],
    details: "Elegant neckline with secure elastic—perfect for warm-weather events and daytime parties.",
  },

  {
    name: "Pinafore Dress",
    price: "$45",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/pinafore2.jpeg",
        alt: "Blue denim pinafore dress.",
      },
    ],
    colors: [
      { id: "bluedenim", name: "Blue Denim", classes: "bg-blue-500 checked:outline-blue-500" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "beige", name: "Beige", classes: "bg-yellow-100 checked:outline-yellow-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A playful pinafore dress layered perfectly over tees or blouses.",
    highlights: [
      "Adjustable straps",
      "Front pocket detail",
      "Casual denim style",
    ],
    details: "Layer it over tees or blouses for versatile looks—practical pockets and adjustable straps add comfort.",
  },

  {
    name: "Knitted Dress",
    price: "$70",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/knitted1.jpeg",
        alt: "Beige knitted sweater dress.",
      },
    ],
    colors: [
      { id: "beige", name: "Beige", classes: "bg-amber-100 checked:outline-amber-400" },
      { id: "gray", name: "Gray", classes: "bg-gray-400 checked:outline-gray-400" },
      { id: "brown", name: "Brown", classes: "bg-yellow-800 checked:outline-yellow-800" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A cozy knitted dress designed to keep you stylish and warm during colder months.",
    highlights: [
      "Chunky knit fabric",
      "Midi length",
      "Stretch fit",
    ],
    details: "Warm and comfy—pair with boots and a long coat for winter-ready styling. Hand-wash recommended to preserve knit.",
  },

  {
    name: "Polo Dress",
    price: "$30",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      {
        src: "/images/polo2.jpeg",
        alt: "Navy blue polo dress.",
      },
    ],
    colors: [
      { id: "navy", name: "Navy", classes: "bg-blue-800 checked:outline-blue-800" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A sporty polo dress with a casual collar, perfect for effortless weekend style.",
    highlights: [
      "Short sleeves with collar",
      "Above-knee cut",
      "Breathable cotton fabric",
    ],
    details: "Sporty-casual staple—throw on sneakers and a cap for an easy weekend outfit.",
  },

  {
  name: "Swing Dress",
  price: "$45",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Dresses", href: "#" },
  ],
  images: [
    { src: "/images/swing2.jpeg", alt: "Flowy floral swing dress." },
  ],
  colors: [
    { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
    { id: "green", name: "Green", classes: "bg-green-600 checked:outline-green-600" },
    { id: "yellow", name: "Yellow", classes: "bg-yellow-400 checked:outline-yellow-400" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description: "A breezy swing dress with a relaxed fit and playful movement.",
  highlights: [
    "Relaxed A-line silhouette",
    "Above-knee length",
    "Lightweight fabric for easy flow",
  ],
  details: "Perfect for casual outings—pairs well with sandals or flats.",
  },

  {
    name: "Milkmaid Dress",
    price: "$50",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/milkmaid.jpeg", alt: "White milkmaid dress with puff sleeves." },
    ],
    colors: [
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "pink", name: "Pink", classes: "bg-pink-300 checked:outline-pink-300" },
      { id: "blue", name: "Blue", classes: "bg-blue-400 checked:outline-blue-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "Romantic milkmaid dress with puff sleeves and a fitted bodice.",
    highlights: [
      "Square neckline",
      "Elastic puff sleeves",
      "Cinched waist with flowy skirt",
    ],
    details: "Ideal for summer brunches or garden parties.",
  },

  {
    name: "Ball Dress",
    price: "$120",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/ball2.jpeg", alt: "Elegant ball gown with full skirt." },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-black checked:outline-black" },
      { id: "navy", name: "Navy", classes: "bg-blue-800 checked:outline-blue-800" },
      { id: "burgundy", name: "Burgundy", classes: "bg-red-800 checked:outline-red-800" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false },
      { name: "XL", inStock: true },
    ],
    description: "A dramatic ball gown with a fitted bodice and voluminous skirt.",
    highlights: [
      "Floor-length design",
      "Structured corset top",
      "Layers of tulle and satin",
    ],
    details: "Made for formal events—pair with heels and statement jewelry.",
  },

  {
    name: "Halter Neck Dress",
    price: "$55",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/halter-neck.jpeg", alt: "Red halter neck dress." },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "red", name: "Red", classes: "bg-red-600 checked:outline-red-600" },
      { id: "teal", name: "Teal", classes: "bg-teal-600 checked:outline-teal-600" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A chic halter neck dress with a flattering neckline.",
    highlights: [
      "Halter tie closure",
      "Sleeveless design",
      "Body-skimming silhouette",
    ],
    details: "Great for evening parties or beach vacations.",
  },

  {
    name: "Jumper Dress",
    price: "$40",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/jumper1.jpeg", alt: "Denim jumper dress with pockets." },
    ],
    colors: [
      { id: "denim", name: "Denim", classes: "bg-blue-500 checked:outline-blue-500" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "beige", name: "Beige", classes: "bg-yellow-200 checked:outline-yellow-200" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
    description: "Casual jumper dress with a pinafore-inspired look.",
    highlights: [
      "Adjustable straps",
      "Front pockets",
      "Layer-friendly style",
    ],
    details: "Pair with a t-shirt or turtleneck for a versatile outfit.",
  },

  {
    name: "Jersey Dress",
    price: "$35",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/jersey1.jpeg", alt: "Comfortable jersey dress." },
    ],
    colors: [
      { id: "gray", name: "Gray", classes: "bg-gray-400 checked:outline-gray-400" },
      { id: "navy", name: "Navy", classes: "bg-blue-800 checked:outline-blue-800" },
      { id: "black", name: "Black", classes: "bg-black checked:outline-black" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "Everyday jersey dress made from soft stretch fabric.",
    highlights: [
      "Short-sleeve design",
      "Stretchy and breathable",
      "Above-knee length",
    ],
    details: "Effortlessly stylish—perfect for casual wear.",
  },

  {
    name: "Hoodie Dress",
    price: "$60",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/hoodie2.jpeg", alt: "Gray hoodie dress." },
    ],
    colors: [
      { id: "gray", name: "Gray", classes: "bg-gray-400 checked:outline-gray-400" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "pink", name: "Pink", classes: "bg-pink-400 checked:outline-pink-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
    description: "Sporty hoodie dress with a relaxed fit and casual vibe.",
    highlights: [
      "Attached hood",
      "Kangaroo pocket",
      "Long sleeves with ribbed cuffs",
    ],
    details: "Cozy and stylish—wear with sneakers for a streetwear look.",
  },

  {
    name: "Shift Dress",
    price: "$45",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/shift2.jpeg", alt: "Classic shift dress." },
    ],
    colors: [
      { id: "blue", name: "Blue", classes: "bg-blue-500 checked:outline-blue-500" },
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "Minimalist shift dress with a straight silhouette.",
    highlights: [
      "Above-knee length",
      "Sleeveless cut",
      "Simple and versatile design",
    ],
    details: "Can be dressed up with heels or kept casual with flats.",
  },

  {
    name: "Smock Dress",
    price: "$38",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/smock1.jpeg", alt: "Loose smock dress." },
    ],
    colors: [
      { id: "mint", name: "Mint", classes: "bg-green-300 checked:outline-green-300" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "lavender", name: "Lavender", classes: "bg-purple-300 checked:outline-purple-300" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "A loose-fitting smock dress designed for comfort and ease.",
    highlights: [
      "Billowy fit",
      "Lightweight cotton",
      "Above-knee length",
    ],
    details: "Perfect maternity-friendly choice or casual daywear.",
  },

  {
    name: "Wedding Dress",
    price: "$250",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/wed2.jpeg", alt: "Elegant bridal wedding dress." },
    ],
    colors: [
      { id: "ivory", name: "Ivory", classes: "bg-yellow-50 checked:outline-yellow-50" },
      { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
      { id: "champagne", name: "Champagne", classes: "bg-yellow-200 checked:outline-yellow-200" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
    description: "Timeless wedding gown crafted for elegance and grace.",
    highlights: [
      "Floor-length silhouette",
      "Delicate lace details",
      "Flowing train and fitted bodice",
    ],
    details: "An unforgettable bridal look for the special day.",
  },

  {
    name: "Longsleeved Dress",
    price: "$48",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Dresses", href: "#" },
    ],
    images: [
      { src: "/images/long2.jpeg", alt: "Longsleeved midi dress." },
    ],
    colors: [
      { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
      { id: "maroon", name: "Maroon", classes: "bg-red-700 checked:outline-red-700" },
      { id: "olive", name: "Olive", classes: "bg-green-700 checked:outline-green-700" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ],
    description: "Sophisticated longsleeved dress offering full coverage and style.",
    highlights: [
      "Long fitted sleeves",
      "Midi length cut",
      "Stretchy and comfortable fabric",
    ],
    details: "Great for cooler weather or modest fashion looks.",
  }
];

const reviews = [
  { id: "1", href: "#", average: 4.5, totalCount: 87 },
  { id: "2", href: "#", average: 4.2, totalCount: 65 },
  { id: "3", href: "#", average: 4.7, totalCount: 134 },
  { id: "4", href: "#", average: 4.4, totalCount: 102 },
  { id: "5", href: "#", average: 4.8, totalCount: 89 },
  { id: "6", href: "#", average: 4.1, totalCount: 54 },
  { id: "7", href: "#", average: 4.6, totalCount: 112 },
  { id: "8", href: "#", average: 4.3, totalCount: 97 },
  { id: "9", href: "#", average: 4.5, totalCount: 120 },
  { id: "10", href: "#", average: 4.9, totalCount: 210 },
  { id: "11", href: "#", average: 4.2, totalCount: 76 },
  { id: "12", href: "#", average: 4.0, totalCount: 58 },
  { id: "13", href: "#", average: 4.7, totalCount: 143 },
  { id: "14", href: "#", average: 4.1, totalCount: 88 },
  { id: "15", href: "#", average: 4.6, totalCount: 99 },
  { id: "16", href: "#", average: 4.3, totalCount: 67 },
  { id: "17", href: "#", average: 5.0, totalCount: 44 },
  { id: "18", href: "#", average: 4.8, totalCount: 131 },
  { id: "19", href: "#", average: 4.4, totalCount: 72 },
  { id: "20", href: "#", average: 4.6, totalCount: 84 },
  { id: "21", href: "#", average: 4.5, totalCount: 93 },
  { id: "22", href: "#", average: 4.2, totalCount: 59 },
  { id: "23", href: "#", average: 4.7, totalCount: 115 },
  { id: "24", href: "#", average: 4.3, totalCount: 78 },
  { id: "25", href: "#", average: 4.9, totalCount: 150 },
  { id: "26", href: "#", average: 4.1, totalCount: 61 },
  { id: "27", href: "#", average: 4.4, totalCount: 80 },
  { id: "28", href: "#", average: 4.6, totalCount: 105 },
  { id: "29", href: "#", average: 4.5, totalCount: 98 },
  { id: "30", href: "#", average: 4.2, totalCount: 70 },
  { id: "31", href: "#", average: 4.8, totalCount: 140 },
  { id: "32", href: "#", average: 4.3, totalCount: 66 },
  { id: "33", href: "#", average: 4.7, totalCount: 123 },
]

export { products, reviews }

