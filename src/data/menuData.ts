import eclairChocolateImg from "@/assets/menu/eclair-chocolate.jpg.asset.json";
import eclairPistachioImg from "@/assets/menu/eclair-pistachio.jpg.asset.json";
import eclairSaltedCaramelImg from "@/assets/menu/eclair-salted-caramel.jpg.asset.json";
import eclairVanillaImg from "@/assets/menu/eclair-vanilla.jpg.asset.json";
import miniTartRaspberryImg from "@/assets/menu/mini-tart-raspberry.jpg.asset.json";
import potatoCherryImg from "@/assets/menu/potato-cherry.jpg.asset.json";
import pavlovaBerryImg from "@/assets/menu/pavlova-berry.jpg.asset.json";
import pavlovaBlueberryLemonImg from "@/assets/menu/pavlova-blueberry-lemon.jpg.asset.json";
import pavlovaMangoPassionImg from "@/assets/menu/pavlova-mango-passion.jpg.asset.json";
import trifleBerryPistachioImg from "@/assets/menu/trifle-berry-pistachio.jpg.asset.json";
import donutStrawberryImg from "@/assets/menu/donut-strawberry.jpg.asset.json";
import donutForestBerriesImg from "@/assets/menu/donut-forest-berries.jpg.asset.json";
import donutDarkChocolateImg from "@/assets/menu/donut-dark-chocolate.jpg.asset.json";
import donutSaltedCaramelImg from "@/assets/menu/donut-salted-caramel.jpg.asset.json";
import donutPannaCottaImg from "@/assets/menu/donut-panna-cotta.jpg.asset.json";
import donutCherryImg from "@/assets/menu/donut-cherry.jpg.asset.json";
import donutHazelnutImg from "@/assets/menu/donut-hazelnut.jpg.asset.json";
import macaronChampagneCurrantImg from "@/assets/menu/macaron-champagne-currant.jpg.asset.json";
import macaronBaileysCaramelImg from "@/assets/menu/macaron-baileys-caramel.jpg.asset.json";
import macaronDorbluPearImg from "@/assets/menu/macaron-dorblu-pear.jpg.asset.json";
import macaronMojitoRaspberryImg from "@/assets/menu/macaron-mojito-raspberry.jpg.asset.json";
import macaronPistachioBlueberryImg from "@/assets/menu/macaron-pistachio-blueberry.jpg.asset.json";
import macaronVanillaStrawberryImg from "@/assets/menu/macaron-vanilla-strawberry.jpg.asset.json";
import breadDarnytskyiImg from "@/assets/menu/bread-darnytskyi.jpg.asset.json";
import breadYeastFreeImg from "@/assets/menu/bread-yeast-free.jpg.asset.json";

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  weight: string;
  image?: string;
  ingredients?: string;
  storage?: string;
  /** Highlight badge shown on the card */
  badge?: "NEW" | "ОНОВЛЕННЯ ДЕКОРУ";
  /** Product can be frozen */
  freezable?: boolean;
  /** Overrides the category minimum order quantity */
  minOrder?: number;
}

export interface MenuCategory {
  name: string;
  /** Minimum order quantity per item in this group */
  minOrder: number;
  /** Short note under the category title (shelf life etc.) */
  note?: string;
  items: MenuItem[];
}

const B = "https://cdn-media.choiceqr.com/prod-eat-peremoga-bakery950/menu/thumbnail_";

export const deliveryTerms = {
  title: "УМОВИ ДОСТАВКИ",
  blocks: [
    {
      heading: "Для м. Києва",
      lines: [
        "Прийом замовлення за день до дня поставки: нд — пт до 17:00",
        "Доставка замовлень: пн 09:00 — 14:00, ср 09:00 — 14:00, пт 09:00 — 14:00",
        "Мінімальна сума замовлення — 1 000 грн",
        "Вартість доставки: правий берег — 200 грн, лівий берег — 250 грн",
        "При замовленні від 2 000 грн доставка безкоштовна",
      ],
    },
    {
      heading: "Для м. Ірпінь, Буча, Білогородка і район Троєщина (м. Київ)",
      lines: [
        "Доставка замовлень по середах 10:00 — 14:00",
        "Мінімальна сума замовлення — 1 000 грн",
        "Вартість доставки — 250 грн",
        "При замовленні від 2 000 грн доставка безкоштовна",
      ],
    },
    {
      heading: "Особливі умови",
      lines: [
        "Можливе відтермінування платежу 2–3 дні",
        "Чат підтримки: пн — пт 10:00 — 17:00, сб — нд 12:30 — 17:00",
      ],
    },
    {
      heading: "Форма замовлення",
      lines: [
        "Назва закладу",
        "Адреса та номер отримувача замовлення",
        "Вид оплати: ФОП / готівка (якщо ФОП — дані платника)",
        "+380 96 96 94 485 — Максим",
      ],
    },
    {
      heading: "Дегустаційний сет",
      lines: [
        "Партнер може замовити сет з трьох позицій з меню на вибір — ми безкоштовно доставимо дегустаційний сет на локацію!",
      ],
    },
  ],
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Новинки",
    minOrder: 1,
    items: [
      {
        name: "Наполеон чорничний",
        price: "1 250 ₴",
        description:
          "Наполеон з чорничним кремом на основі заварного крему з вершками та чорницею, декорований лохиною.",
        weight: "1,7 кг",
        badge: "NEW",
        storage: "Термін придатності: 4 доби.",
        image: B + "ehLxZ-cvlUC-IVXAg.png",
      },
      {
        name: "Тарт з малиною",
        price: "1 050 ₴",
        description: "Пісочна основа, фісташкова начинка та свіжа малина.",
        weight: "1,33 кг",
        badge: "NEW",
        storage: "Термін придатності: 3 доби.",
        image: B + "wIFnc-IBaHI-GDIPW.jpeg",
      },
      {
        name: "Тарт чорничний з мʼятою",
        price: "980 ₴",
        description:
          "Пісочна основа, мʼятний крем на основі білого шоколаду, крем з чорницею та вершками, декорований лохиною.",
        weight: "1,13 кг",
        badge: "NEW",
        storage: "Термін придатності: 3 доби.",
        image: B + "IiOSq-GyIqb-uODEG.png",
      },
      {
        name: "Торт Тропік",
        price: "1 300 ₴",
        description:
          "Вершкові бісквіти, крем манго, конфі маракуя зі шматочками манго, декорований вершками і кюлі маракуя.",
        weight: "1,68 кг",
        badge: "NEW",
        storage: "Термін придатності: 4 доби.",
        image: B + "CVHbG-JGuFl-zdKbK.png",
      },
    ],
  },
  {
    name: "Круглі круасани · New York Rolls",
    minOrder: 5,
    note: "Мінімальне замовлення від 5 шт. з асортименту · Термін зберігання: 2 дні",
    items: [
      {
        name: "Ягідний йогурт",
        price: "125 ₴",
        description:
          "Круглий круасан з листкового тіста. Начинка: йогуртово-ягідний крем. Прикрашений кольоровою глазурʼю і сезонними ягодами.",
        weight: "190 г",
        image: B + "ASJSH-vLceE-lcxVI.png",
      },
      {
        name: "Фісташка-малина",
        price: "133 ₴",
        description:
          "Круглий круасан з листкового тіста. Начинка: вершково-фісташковий крем та малинове кюлі. Прикрашений кольоровою глазурʼю, сезонними ягодами та подрібненою фісташкою.",
        weight: "180 г",
        image: B + "bTFQA-nIFeE-TWUCv.png",
      },
      {
        name: "Вибухова карамель",
        price: "125 ₴",
        description:
          "Круглий круасан з листкового тіста. Начинка: крем із солоною карамеллю. Прикрашений карамеллю і солодким попкорном.",
        weight: "170 г",
        image: B + "qchkp-bLrWH-vfPHB.png",
      },
      {
        name: "Манго-маракуя",
        price: "125 ₴",
        description:
          "Круглий круасан з листкового тіста. Начинка: крем зі смаком манго-маракуя. Прикрашений кольоровою глазурʼю, сушеним манго і шоколадною крихтою.",
        weight: "180 г",
        badge: "NEW",
        image: B + "Ctoeb-WoFQg-xSfym.png",
      },
      {
        name: "Шоколадний цитрус",
        price: "125 ₴",
        description:
          "Круглий круасан з листкового тіста. Начинка: вершково-шоколадний крем з апельсиново-лимонним курдом. Прикрашений шоколадною глазурʼю і апельсином.",
        weight: "190 г",
        image: B + "FukqX-eToCs-zrcyz.png",
      },
      {
        name: "Полуниця",
        price: "125 ₴",
        description:
          "Круасан-рол з вершковим кремом на основі білого шоколаду та полуничне конфі зі свіжою полуницею. Декорований сублімованими ягодами.",
        weight: "190 г",
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        image: B + "NlJvK-cYdsg-MIPmU.png",
      },
    ],
  },
  {
    name: "Класичні круасани і равлик",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 2-3 дні",
    items: [
      {
        name: "Шоколадний",
        price: "73 ₴",
        description: "Листкове тісто з вершковим маслом. Начинка: шоколадно-фундучна.",
        weight: "136 г",
        image: B + "EPDpV-glrco-WsdAP.png",
      },
      {
        name: "Вишневий",
        price: "69 ₴",
        description:
          "Листкове тісто з вершковим маслом. Начинка: цілі шматочки натуральної вишні.",
        weight: "136 г",
        image: B + "HdLxY-ffsWK-ngiGC.png",
      },
      {
        name: "Мигдалевий",
        price: "83 ₴",
        description:
          "Листкове тісто з вершковим маслом. Начинка: франжипан, в якому багато мигдального борошна з нотками апельсину та коньяку. Прикрашений мигдальними пластівцями.",
        weight: "145 г",
        image: B + "RdYbF-JBCdP-VhDyO.png",
      },
      {
        name: "Класичний",
        price: "55 ₴",
        description: "Ніжне і ароматне листкове тісто. Без начинки.",
        weight: "95 г",
      },
      {
        name: "Лимонний",
        price: "99 ₴",
        description:
          "Ніжне листкове тісто. Начинка: лимонний крем з кислинкою. Прикрашений італійською меренгою.",
        weight: "160 г",
        image: B + "EFhRG-QONTe-gjFfD.png",
      },
      {
        name: "Фісташковий",
        price: "112 ₴",
        description:
          "Листкове тісто з вершковим маслом. Начинка: фісташковий крем власного виробництва з фісташковою пастою.",
        weight: "165 г",
        image: B + "gYfuH-WHeCI-BnIGT.png",
      },
      {
        name: "Кокосовий",
        price: "99 ₴",
        description:
          "Листкове тісто. Начинка: на основі білого шоколаду та кокосового борошна. Прикрашений глазурʼю та кокосовою стружкою.",
        weight: "150 г",
        image: B + "nmsCG-sCsew-ZFCHY.png",
      },
      {
        name: "Йогуртовий",
        price: "99 ₴",
        description:
          "Ніжне листкове тісто. Начинка: йогуртова та чорнично-смородинова. Прикрашений сублімованою малиною.",
        weight: "170 г",
        image: B + "JHRHL-GaNGc-FmoOc.png",
      },
      {
        name: "Равлик вишневий",
        price: "37 ₴",
        description:
          "Равлик з листкового тіста з корицею та вишневим кюлі. Вкритий вишневим соусом.",
        weight: "125 г",
        minOrder: 4,
        image: B + "lJWDI-exDlQ-OULBT.png",
      },
    ],
  },
  {
    name: "Чізкейки",
    minOrder: 1,
    note: "Термін зберігання: 5 днів",
    items: [
      {
        name: "Чізкейк Нью-Йорк з солоною карамеллю",
        price: "990 ₴",
        description:
          "Класичний чізкейк з ніжним вершковим сиром. Вкритий тягучою солоною карамеллю власного виробництва. Прикрашений сезонними ягодами та мигдальними пластівцями. К-ть шматочків — 10 шт.",
        weight: "1,6 кг",
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        image: B + "DleCr-bIHGB-CCnAi.png",
      },
      {
        name: "Чізкейк Нью-Йорк з солоною карамеллю (шматочок)",
        price: "99 ₴",
        description: "Шматочок чізкейка Нью-Йорк з солоною карамеллю та сезонними ягодами.",
        weight: "160 г",
        image: B + "DleCr-bIHGB-CCnAi.png",
      },
      {
        name: "Чізкейк Нью-Йорк",
        price: "890 ₴",
        description:
          "Класичний чізкейк. Основа з пісочного тіста. Зроблений з ніжним вершковим сиром. К-ть шматочків — 10 шт.",
        weight: "1,4 кг",
        image: B + "EykUe-JFWIA-PtxuC.jpeg",
      },
      {
        name: "Чізкейк Нью-Йорк (шматочок)",
        price: "89 ₴",
        description: "Шматочок класичного чізкейка Нью-Йорк.",
        weight: "140 г",
        image: B + "EykUe-JFWIA-PtxuC.jpeg",
      },
    ],
  },
  {
    name: "Еклери",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 3 дні",
    items: [
      {
        name: "Манго-полуниця",
        price: "79 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду, натуральне манго, полуничне кюлі. Прикрашений кольоровою глазурʼю, ніжним кремом і сублімованою полуницею.",
        weight: "75 г",
        freezable: true,
        image: B + "GrXXU-hApPP-PkCpn.png",
      },
      {
        name: "Чорниця-лимон",
        price: "82 ₴",
        description:
          "Заварне тісто. Начинка: чорничний крем на основі білого шоколаду та вершків, лимонний курд. Прикрашений лохиною і ніжним кремом.",
        weight: "100 г",
        badge: "NEW",
        freezable: true,
        image: B + "KsAFb-qevzu-oFHRF.png",
      },
      {
        name: "Фісташковий",
        price: "89 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду, сезонні ягоди. Прикрашений кольоровою глазурʼю та подрібненою фісташкою.",
        weight: "70 г",
        freezable: true,
        image: eclairPistachioImg.url,
      },
      {
        name: "Шоколадний",
        price: "79 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду з додаванням чорного шоколаду. Прикрашений кольоровою глазурʼю і ніжним шоколадним кремом.",
        weight: "80 г",
        freezable: true,
        image: eclairChocolateImg.url,
      },
      {
        name: "Солона карамель",
        price: "79 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду, солона карамель. Прикрашений кольоровою глазурʼю, горіховою крихтою і солодким попкорном.",
        weight: "70 г",
        freezable: true,
        image: eclairSaltedCaramelImg.url,
      },
      {
        name: "Малина-мʼята",
        price: "79 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду, мʼята та малинове кюлі власного виробництва. Прикрашений кольоровою глазурʼю.",
        weight: "70 г",
        freezable: true,
        image: B + "QvzqW-wHCKE-sUbHT.png",
      },
      {
        name: "Ванільний",
        price: "79 ₴",
        description:
          "Заварне тісто. Начинка: крем-муслін на основі білого шоколаду з ваніллю. Прикрашений кольоровою глазурʼю і ніжним кремом.",
        weight: "75 г",
        freezable: true,
        image: eclairVanillaImg.url,
      },
      {
        name: "З полуницею",
        price: "89 ₴",
        description:
          "Еклер з подвійною начинкою: ванільним кремом на основі білого шоколаду та полуничним конфі зі свіжою полуницею.",
        weight: "100 г",
        freezable: true,
        image: B + "sdGLh-mNykM-flsHY.png",
      },
    ],
  },
  {
    name: "Торти",
    minOrder: 1,
    note: "Термін зберігання: 4 дні",
    items: [
      {
        name: "Фісташка-малина",
        price: "1 470 ₴",
        description:
          "Фісташкові коржі, малинове кюлі та фісташково-вершковий крем. Декорований фісташкою та сублімованою або свіжою малиною. К-ть шматочків — 12 шт. Шматок — 123 грн.",
        weight: "1,9 кг",
        freezable: true,
        image: B + "xlCIe-iGIrk-kBAbR.png",
      },
      {
        name: "Полуниця-карамель",
        price: "1 370 ₴",
        description:
          "Ванільний бісквіт, полуничне кюлі, вершковий крем та карамель власного виробництва. К-ть шматочків — 12 шт. Шматок — 114 грн.",
        weight: "1,7 кг",
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        freezable: true,
        image: B + "NOFor-KiFHy-brVRK.png",
      },
      {
        name: "Снікерс",
        price: "1 530 ₴",
        description:
          "Шоколадні коржі, вершково-масляний крем, арахіс та тягуча карамель власного виробництва. К-ть шматочків — 12 шт. Шматок — 115 грн.",
        weight: "2,3 кг",
        image: B + "VZWCB-MTElG-Xpwbz.png",
      },
      {
        name: "Меренговий торт з сезонними ягодами",
        price: "980 ₴",
        description:
          "Коржі меренги з полуничним кремом на крем-сирі та з полуничним кюлі в начинці. Декорований свіжими ягодами на вибір.",
        weight: "1,3 кг",
        image: B + "CVHbG-JGuFl-zdKbK.png",
      },
      {
        name: "Естерхазі",
        price: "1 300 ₴",
        description:
          "Мигдально-горіхові коржі, масляно-заварний крем зі згущеним молоком. К-ть шматочків — 12 шт. Шматок — 108 грн.",
        weight: "1,75 кг",
        freezable: true,
        image: B + "kkRJk-flJeM-dQJIx.png",
      },
      {
        name: "Полуничний наполеон",
        price: "1 250 ₴",
        description:
          "Класичні коржі, ніжний заварний крем з вершками, полуничне кюлі, декорований сезонними ягодами.",
        weight: "2 кг",
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        image: B + "ehLxZ-cvlUC-IVXAg.png",
      },
      {
        name: "Класичний наполеон",
        price: "1 200 ₴",
        description:
          "Ніжне листкове тісто. Заварний крем на ароматному вершковому маслі. К-ть шматочків — 12 шт. Шматок — 104 грн.",
        weight: "2 кг",
        image: B + "ehLxZ-cvlUC-IVXAg.png",
      },
      {
        name: "Медівник з вишнею",
        price: "1 250 ₴",
        description:
          "Медові коржі, вершковий сметанний крем та вишня. К-ть шматочків — 12 шт. Шматок — 108 грн.",
        weight: "2,2 кг",
        image: B + "yGqIv-aClzA-JeWsk.png",
      },
      {
        name: "Бенто тортики",
        price: "680 ₴",
        description:
          "Смаки: фісташка-малина, полуниця-карамель, снікерс. Індивідуальний декор.",
        weight: "0,5 кг",
        image: B + "hecZW-WGfDw-YZBPS.png",
      },
    ],
  },
  {
    name: "Тарти",
    minOrder: 1,
    note: "Термін зберігання: 5 днів",
    items: [
      {
        name: "Лимонний",
        price: "750 ₴",
        description:
          "Тарт на основі пісочного тіста з лимонним курдом та італійською меренгою. К-ть шматочків — 10 шт. Шматок — 73 грн.",
        weight: "1,5 кг",
        image: B + "KTUbn-QeFHH-WUYGP.png",
      },
      {
        name: "З панакотою та смородиною",
        price: "980 ₴",
        description: "Пісочна основа, смородинове конфі, панакота та ніжна меренга. Шматок — 95 грн.",
        weight: "1,7 кг",
        image: B + "IiOSq-GyIqb-uODEG.png",
      },
      {
        name: "З малиною",
        price: "1 050 ₴",
        description:
          "Пісочне тісто з мигдалевим борошном, фісташковий крем та свіжа малина.",
        weight: "1,4 кг",
        badge: "NEW",
        storage: "Термін придатності: 3 доби.",
        image: B + "wIFnc-IBaHI-GDIPW.jpeg",
      },
    ],
  },
  {
    name: "Міні-тарти",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 3-4 доби",
    items: [
      {
        name: "Міні-тарт малина",
        price: "71 ₴",
        description:
          "Пісочний хрумкий міні-тарт зі свіжою малиною та ванільним кремом на основі білого шоколаду.",
        weight: "60 г",
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        image: miniTartRaspberryImg.url,
      },
      {
        name: "Міні-тарт лимонний",
        price: "69 ₴",
        description: "Пісочний хрумкий тарт з лимонним курдом та білково-заварним кремом.",
        weight: "60 г",
        image: B + "UCeOg-GTeCk-JUJAL.png",
      },
    ],
  },
  {
    name: "Пироги-кіші",
    minOrder: 1,
    note: "Термін зберігання: 3 дні",
    items: [
      {
        name: "Кіш курка-гриби",
        price: "790 ₴",
        description:
          "Листкове тісто. Курка та гриби. Сирно-вершкова заливка, велика кількість сиру сулугуні та моцарели. Прикрашений томатами чері.",
        weight: "1,2 кг",
        freezable: true,
        image: B + "KHUFI-qkFwl-fkUZJ.jpeg",
      },
    ],
  },
  {
    name: "Солоні круасани",
    minOrder: 5,
    note: "Мінімальне замовлення від 5 шт. з асортименту · Термін зберігання: 3 дні",
    items: [
      {
        name: "З баликом",
        price: "110 ₴",
        description: "Класичний круасан. Крем-сир, балик, сир чедер, огірок, салат.",
        weight: "200 г",
        image: B + "gnhGH-KSjsa-FAkbi.png",
      },
      {
        name: "Зерновий з куркою",
        price: "115 ₴",
        description: "Зерновий круасан. Майонез, курячий рулет, сир чедер, помідор, салат.",
        weight: "200 г",
        image: B + "HlgoZ-zAVyL-FvJmU.png",
      },
      {
        name: "З куркою «Теріякі»",
        price: "127 ₴",
        description: "Круасан. Майонез, соус теріякі, салат, огірок, запечена курка, імбир, кунжут.",
        weight: "220 г",
        image: B + "rRSqa-XjJke-oRrLw.png",
      },
      {
        name: "З куркою «Цезар»",
        price: "137 ₴",
        description:
          "Круасан. Соус цезар, салат айсберг, помідор, запечена курка, яйце варене, сир пармезан.",
        weight: "245 г",
        image: B + "Ygbus-RFBiH-JRLQR.png",
      },
      {
        name: "З телятиною і солоними огірками",
        price: "132 ₴",
        description:
          "Круасан. Запечена телятина, солоний огірок, карамелізована цибуля, салат, сир чедер, соус ягідний, соус «американський стиль».",
        weight: "210 г",
        image: B + "cLjlW-cUztz-pjAph.png",
      },
    ],
  },
  {
    name: "Сендвічі на крафтовому хлібі",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 3 дні",
    items: [
      {
        name: "Хамон & помідор",
        price: "135 ₴",
        description:
          "Хліб гречаний на заквасці власного виробництва, соус гірчично-медовий, хамон, рукола, сир салямі, помідор.",
        weight: "245 г",
        image: B + "IgJFLiz-tgAllIy-TgyZstf_F-r-S.jpeg",
      },
      {
        name: "Телятина & ягідний соус",
        price: "115 ₴",
        description:
          "Хліб гречаний на заквасці, телятина запечена рвана власного виробництва, соус ягідний, соус чікфілей фірмовий, сир твердий, карамелізована цибуля, помідор.",
        weight: "200 г",
        image: B + "vMtrbFW-pdneidH-PpCpJIs_H-c-E.jpeg",
      },
      {
        name: "Запечена індичка",
        price: "110 ₴",
        description:
          "Хліб гречаний на заквасці, індичка печена рвана власного виробництва, рукола, помідор, сир королівський, карамелізована цибуля, соус чікфілей фірмовий.",
        weight: "200 г",
        image: B + "qOwijxC-sFhYeDX-xLovkKz_P-b-f.jpeg",
      },
      {
        name: "Шинка & овочі",
        price: "110 ₴",
        description:
          "Хліб гречаний на заквасці, сир гауда, шинка, соус кисло-солодкий, рукола, листя салату, огірок, помідор.",
        weight: "200 г",
        image: B + "sZfibrM-dFWmDDa-ENktZCr_P-H-B.jpeg",
      },
      {
        name: "Вʼялена яловичина",
        price: "122 ₴",
        description:
          "Хліб гречаний на заквасці, яловичина вʼялена, соус мексиканський, кисло-солодкий соус, листя салату, помідор, огірок, сир твердий.",
        weight: "200 г",
        image: B + "hvarnGS-uHPPrcz-tbwOnCt_K-x-I.jpeg",
      },
    ],
  },
  {
    name: "Тістечка «Картопля»",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 4 дні",
    items: [
      {
        name: "«Картопля» вишня",
        price: "57 ₴",
        description:
          "Шоколадний бісквіт з коньяком. У начинці солодка вишня. Глазур на основі білого шоколаду.",
        weight: "85 г",
        freezable: true,
        image: potatoCherryImg.url,
      },
      {
        name: "«Картопля» фісташка-малина",
        price: "65 ₴",
        description:
          "Фісташковий бісквіт з фісташковою пастою і малинове кюлі. Вкрита глазурʼю на основі білого шоколаду.",
        weight: "85 г",
        freezable: true,
        image: B + "aHKPT-KeVaD-YYbpD.png",
      },
      {
        name: "«Картопля» карамель",
        price: "52 ₴",
        description:
          "Шоколадний бісквіт з молоком, какао та коньяком. У начинці солона карамель власного виробництва.",
        weight: "85 г",
        freezable: true,
        image: B + "WIHuJ-FRcFI-jhSyw.png",
      },
      {
        name: "«Картопля» рафаелло",
        price: "52 ₴",
        description: "Крем з білого шоколаду та мигдаль.",
        weight: "85 г",
        freezable: true,
        image: B + "mGUkb-ADVeV-KsbFe.jpeg",
      },
    ],
  },
  {
    name: "Порційні десерти",
    minOrder: 5,
    note: "Мінімальне замовлення вказане окремо для кожної позиції",
    items: [
      {
        name: "Десерт Павлова",
        price: "79 ₴",
        description:
          "Ніжне безе, крем на основі вершкового сиру та малинове кюлі. Прикрашений сезонними ягодами.",
        weight: "85 г",
        minOrder: 4,
        storage: "Термін зберігання: 3 дні",
        image: pavlovaBerryImg.url,
      },
      {
        name: "Десерт Павлова «Чорниця-лимон»",
        price: "82 ₴",
        description: "Меренга, чорничний крем та лимонний курд.",
        weight: "90 г",
        minOrder: 4,
        storage: "Термін зберігання: 3 дні",
        image: pavlovaBlueberryLemonImg.url,
      },
      {
        name: "Десерт Павлова «Манго-маракуя»",
        price: "82 ₴",
        description: "Меренга, крем манго, кюлі з маракуєю.",
        weight: "85 г",
        minOrder: 4,
        storage: "Термін зберігання: 3 дні",
        image: pavlovaMangoPassionImg.url,
      },
      {
        name: "Трайфл ягоди-фісташка",
        price: "68 ₴",
        description:
          "Фісташковий заварний крем, ванільний бісквіт та полуничне кюлі. Декорований свіжими ягодами.",
        weight: "115 г",
        minOrder: 5,
        badge: "ОНОВЛЕННЯ ДЕКОРУ",
        storage: "Термін зберігання: 4 дні",
        image: trifleBerryPistachioImg.url,
      },
      {
        name: "Трайфл тірамісу",
        price: "91 ₴",
        description: "Крем тірамісу, печиво савоярді, кава, какао порошок.",
        weight: "95 г",
        minOrder: 5,
        storage: "Термін зберігання: 4 дні",
        image: B + "edxeR-ofSZC-uIIGJ.jpeg",
      },
      {
        name: "Шоколадна ковбаска",
        price: "75 ₴",
        description:
          "Смак дитинства: насичена шоколадна ковбаса з подрібненими волоськими горіхами та печивом.",
        weight: "150 г",
        minOrder: 5,
        freezable: true,
        storage: "Термін зберігання: 2 тижні. У морозі — півтора місяці.",
        image: B + "leclk-bXcKa-UNPrC.jpeg",
      },
      {
        name: "Трубочки ягідні",
        price: "60 ₴",
        description:
          "Хрумке пісочне тісто в поєднанні з ягідно-масляним кремом. Декоровані сублімованою малиною.",
        weight: "80 г",
        minOrder: 10,
        storage: "Термін зберігання: 7 днів",
        image: B + "yIPZh-pJuJP-vWXlf.png",
      },
      {
        name: "Трубочки з арахісом і згущеним молоком",
        price: "58 ₴",
        description:
          "Десерт, що родом з дитинства. Хрусткі вафлі із начинкою зі згущеного молока, прикрашені подрібненим арахісом.",
        weight: "70-75 г",
        minOrder: 10,
        storage: "Термін зберігання: 7 днів",
        image: B + "wPyGI-EPYAk-cTDpZ.jpeg",
      },
      {
        name: "Солона карамель власного виробництва",
        price: "690 ₴",
        description: "Тягуча солона карамель власного виробництва.",
        weight: "1 кг",
        minOrder: 1,
        image: B + "iTIML-DdeAj-CFPMY.png",
      },
    ],
  },
  {
    name: "Донати",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Термін зберігання: 7 днів",
    items: [
      {
        name: "Полуниця",
        price: "57 ₴",
        description: "Бісквітне ніжне та пухке тісто з полуничною начинкою.",
        weight: "70 г",
        freezable: true,
        image: donutStrawberryImg.url,
      },
      {
        name: "Лісові ягоди",
        price: "57 ₴",
        description:
          "Бісквітне ніжне та пухке тісто з подвійною начинкою з лісових ягід і сирного крему.",
        weight: "70 г",
        freezable: true,
        image: donutForestBerriesImg.url,
      },
      {
        name: "Чорний шоколад",
        price: "57 ₴",
        description: "Бісквітне ніжне та пухке тісто з шоколадною начинкою.",
        weight: "70 г",
        freezable: true,
        image: donutDarkChocolateImg.url,
      },
      {
        name: "Солона карамель",
        price: "57 ₴",
        description:
          "Бісквітне ніжне та пухке тісто з начинкою з солоної карамелі власного виробництва.",
        weight: "70 г",
        freezable: true,
        image: donutSaltedCaramelImg.url,
      },
      {
        name: "Панна котта",
        price: "57 ₴",
        description:
          "Бісквітне ніжне та пухке тісто з подвійною начинкою з малини та сирного крему, прикрашений сублімованою полуницею.",
        weight: "70 г",
        freezable: true,
        image: donutPannaCottaImg.url,
      },
      {
        name: "Вишневий",
        price: "57 ₴",
        description:
          "Бісквітне ніжне та пухке тісто двох різних кольорів — завдяки натуральному барвнику карміну, зі свіжою вишневою начинкою.",
        weight: "70 г",
        freezable: true,
        image: donutCherryImg.url,
      },
      {
        name: "Лісовий горіх",
        price: "59 ₴",
        description:
          "Шоколадне ніжно-повітряне тісто з кремовою начинкою з лісового горіха.",
        weight: "70 г",
        badge: "NEW",
        freezable: true,
        image: donutHazelnutImg.url,
      },
    ],
  },
  {
    name: "Макарони",
    minOrder: 6,
    note: "Мінімальне замовлення від 6 шт. з асортименту · Лише натуральні органічні продукти",
    items: [
      {
        name: "Шампанське — смородина",
        price: "60 ₴",
        description:
          "Білий шоколад lubeka 33%, вершки smietanka 36%, ром, масло 82%, пюре смородини.",
        weight: "40-45 г",
        image: macaronChampagneCurrantImg.url,
      },
      {
        name: "Бейліз — солона карамель",
        price: "60 ₴",
        description:
          "Білий шоколад 33%, вершки 36%, кава, віскі, вершкове масло 82%. Серединка: солона карамель.",
        weight: "40-45 г",
        image: macaronBaileysCaramelImg.url,
      },
      {
        name: "Дорблю — груша",
        price: "60 ₴",
        description: "Білий шоколад, вершки, сир дорблю. Серединка: кюлі з груші.",
        weight: "40-45 г",
        image: macaronDorbluPearImg.url,
      },
      {
        name: "Мохіто — малина",
        price: "60 ₴",
        description: "Білий шоколад, вершки, мʼята, сік лайму, ром. Серединка: кюлі з малини.",
        weight: "40-45 г",
        image: macaronMojitoRaspberryImg.url,
      },
      {
        name: "Фісташка — чорниця",
        price: "60 ₴",
        description: "Білий шоколад, вершки, фісташкова паста. Серединка: кюлі з малини.",
        weight: "40-45 г",
        image: macaronPistachioBlueberryImg.url,
      },
      {
        name: "Ваніль — полуниця",
        price: "60 ₴",
        description: "Білий шоколад, вершки, натуральна ваніль. Серединка: кюлі з полуниці.",
        weight: "40-45 г",
        image: macaronVanillaStrawberryImg.url,
      },
    ],
  },
  {
    name: "Крафтовий хліб",
    minOrder: 1,
    note: "Термін зберігання: 3 дні",
    items: [
      {
        name: "Житній",
        price: "51 ₴",
        description:
          "Зроблений на житній заквасці, має кислуватий смак та щільну консистенцію.",
        weight: "0,450 кг",
        image: B + "WeSGK-ylCVI-MlJlP.jpeg",
      },
      {
        name: "Мультизерновий",
        price: "78 ₴",
        description:
          "Виготовлений на основі пшеничної закваски з додаванням кунжута, соняшникового насіння, льону та суміші пластівців.",
        weight: "0,450 кг",
        image: B + "TehaX-KFrRI-PfCBF.jpeg",
      },
      {
        name: "Гарбузовий",
        price: "73 ₴",
        description:
          "Ніжний і ароматний хліб з додаванням пюре гарбуза. Має солодкуватий смак та мʼяку текстуру.",
        weight: "0,450 кг",
        image: B + "ttzUS-TaYbH-lfeRR.jpeg",
      },
      {
        name: "Дарницький",
        price: "64 ₴",
        description:
          "Приготовлений на житньо-солодовій заквасці з додаванням журавлини, соняшникового насіння та меду.",
        weight: "0,470 кг",
        image: breadDarnytskyiImg.url,
      },
      {
        name: "Гречаний бездріжджовий",
        price: "85 ₴",
        description:
          "Борошно пшеничне в.г., борошно гречане, клейковина пшенична, вода, закваска пшенична, сіль. Технологія довгої ферментації для кращого засвоєння.",
        weight: "0,410 кг",
        image: B + "LyrWk-FHUDe-WmcgH.png",
      },
      {
        name: "Гречаний",
        price: "65 ₴",
        description:
          "Хліб, виготовлений з гречаного борошна, має характерний гречаний смак і темний колір.",
        weight: "0,480 кг",
        image: B + "LyrWk-FHUDe-WmcgH.png",
      },
      {
        name: "Висівковий",
        price: "45 ₴",
        description:
          "Виготовляється на заквасці з додаванням житнього, пшеничного борошна з додаванням висівок.",
        weight: "0,475 кг",
        image: B + "kxrkn-PIqmD-eZecM.jpeg",
      },
      {
        name: "Бездріжджовий",
        price: "55 ₴",
        description:
          "Бездріжджовий хліб з житніми висівками та льоном, зроблений на житній заквасці.",
        weight: "0,450 кг",
        image: breadYeastFreeImg.url,
      },
    ],
  },
];
