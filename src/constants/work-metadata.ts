import { WorkSlug, WorkTag } from "@/types/work";

export type WorkMetadata = {
  title?: string;
  tags?: WorkTag[];
};

export const WORKS: Partial<Record<WorkSlug, WorkMetadata>> = {
  // 2013
  "20130724_ikaku": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20130724_lagia": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20130724_mismagius": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20130724_ugo3d": {
    tags: ["original", "flipnote-studio"],
  },

  // 2017
  "20170611_sqiq": {
    tags: ["fanart", "analog"],
  },
  "20170616_fj": {
    tags: ["fanart", "analog"],
  },

  "20180103_nid": {
    tags: ["fanart"],
  },
  "20180427_429": {
    tags: ["fanart", "analog"],
  },
  "20180714_swordman": {
    tags: ["fanart", "analog"],
  },

  // 2019
  "20190119_rkgk_zelda": {
    tags: ["fanart", "analog"],
  },
  "20190403_coo": {
    tags: ["fanart", "analog"],
  },
  "20190403_minu_inu_spinner": {
    tags: ["fanart", "analog"],
  },
  "20190403_wakuwaku_bubble": {
    tags: ["fanart", "analog"],
  },
  "20190625_lady_fashion_selection": {
    tags: ["fanart", "analog"],
  },
  "20191116_odango": {
    tags: ["fanart"],
  },
  "20191201_sq4_on_sale": {
    tags: ["fanart"],
  },

  // 2020
  "20200101_morinezumi": {
    tags: ["fanart"],
  },
  "20200220_exp": {
    tags: ["fanart"],
  },
  "20200830_kagayaku_zelda": {
    tags: ["fanart"],
  },
  "20201006_my_kenk": {
    tags: ["fanart"],
  },
  "20201006_my_modane": {
    tags: ["fanart"],
  },
  "20201224_modane_sakura": {
    tags: ["original"],
  },
  "20201224_modane_wallpaper": {
    tags: ["original"],
  },

  // 2021
  "20210101_modane_kotoyoro": {
    tags: ["original"],
  },
  "20210114_pickup_zelda": {
    tags: ["fanart"],
  },
  "20210120_modane_aki": {
    tags: ["original"],
  },
  "20210130_modane_ugo": {
    tags: ["original", "flipnote-studio"],
  },
  "20210321_modane_kisei": {
    tags: ["original"],
  },
  "20210508_modane_yumi": {
    tags: ["fanart"],
  },
  "20210515_modane_yahho": {
    tags: ["original"],
  },
  "20210523_nhnk": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20210523_rl": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20210523_tomu_tachi": {
    tags: ["fanart"],
  },
  "20210526_mtp": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20210526_smyi_2": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20210529_modane_art": {
    tags: ["original"],
  },
  "20210619_mochio": {
    tags: ["fanart"],
  },
  "20210710_modane_moda": {
    tags: ["original"],
  },
  "20210711_dual_ichigo": {
    tags: ["fanart"],
  },
  "20210717_modane_nandemo": {
    tags: ["original", "parody"],
  },
  "20210723_modane_amonus": {
    tags: ["original", "parody"],
  },
  "20210723_modane_sleep": {
    tags: ["original"],
  },
  "20210731_chikara": {
    tags: ["fanart"],
  },
  "20210731_discordbot_mdn": {
    tags: ["engineering"],
  },
  "20210806_omochi_logo": {
    tags: ["fanart"],
  },
  "20210806_omochi_yukkuri": {
    tags: ["fanart"],
  },
  "20210807_setoha": {
    tags: ["fanart"],
  },
  "20210824_modane_wado": {
    tags: ["original", "fanart"],
  },
  "20210923_rphpb": {
    tags: ["fanart"],
  },
  "20211014_moda": {
    tags: ["original"],
  },
  "20211015_modane_kanzenrikai": {
    tags: ["original"],
  },
  "20211016_modane_nendoro": {
    tags: ["original", "analog"],
  },
  "20211123_modane_komarigao": {
    tags: ["original"],
  },
  "20211218_modane_mc": {
    tags: ["original"],
  },

  // 2022
  "20220108_modane_cur_close": {
    tags: ["original"],
  },
  "20220108_modane_cur_open": {
    tags: ["original"],
  },
  "20220504_kregwin": {
    tags: ["fanart"],
  },
  "20220611_modane_aa": {
    tags: ["original", "parody"],
  },
  "20220630_modane_orgm": {
    tags: ["original", "analog"],
  },
  "20220807_modane_co2_watcher": {
    tags: ["original", "engineering", "analog"],
  },
  "20220813_eeyan": {
    tags: ["fanart"],
  },
  "20221013_spinner": {
    tags: ["fanart"],
  },
  "20221108_hello_mastodon": {
    tags: ["original", "fanart"],
  },
  "20221123_kems_clew": {
    tags: ["engineering"],
  },
  "20221218_modane_part": {
    tags: ["original"],
  },

  // 2023
  "20231025_keppare": {
    tags: ["fanart"],
  },
  "20231027_modane_live2d_widget": {
    tags: ["original", "engineering"],
  },
  "20231216_todays_target": {
    tags: ["analog"],
  },
  "20231230_homecoming": {
    tags: ["original", "flipnote-studio"],
  },

  // 2024
  "20240106_homecoming_colored": {
    tags: ["original", "flipnote-studio"],
  },
  "20240127_tarumaechan": {
    tags: ["fanart"],
  },
  "20240209_todays_target": {
    tags: ["analog"],
  },

  // 2026
  "20260131-kiritan": {
    tags: ["fanart"],
  },
  "20260302-aichang01": {
    tags: ["original"],
  },
  "20260313-aichang02": {
    tags: ["original"],
  },
  "20260313-aichang03": {
    tags: ["original"],
  },
  "20260318_kanikani": {
    tags: ["original"],
  },
  "20260401-kirby": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20260402-roundsowrd-tsukareta": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20260402-roundsowrd": {
    tags: ["fanart", "flipnote-studio"],
  },
  "20260515-runaria": {
    tags: ["fanart"],
  },
  "20260527-lilleroll01": {
    tags: ["fanart"],
  },
  "20260527-lilleroll02": {
    tags: ["fanart"],
  },
  "20260604-darkhunter": {
    tags: ["fanart"],
  },
  "20260610-swordman": {
    tags: ["fanart"],
  },
  "20260616-modaneswimsuit": {
    tags: ["original", "analog"],
  },
  "20260710-yunyun": {
    tags: ["fanart"],
  },
  "20260712-mo": {
    tags: ["original"],
  },
  "20260713_205657": {
    tags: ["original", "axnos-paint"],
  },
  "20260714_163032": {
    tags: ["original", "axnos-paint"],
  },
  "20260717_020823": {
    tags: ["original", "axnos-paint"],
  },
  "20260718-shirusumayu": {
    tags: ["fanart"],
  },
  "20260718-shirusumayux": {
    tags: ["fanart", "axnos-paint"],
  },
  "20260718-shirusumayuy": {
    tags: ["fanart", "axnos-paint"],
  },
  "20260722_042500": {
    tags: ["original", "axnos-paint"],
  },
  "20260725-paradisered": {
    tags: ["fanart"],
  },
  "20260730-tarumae": {
    tags: ["fanart"],
  },
  "20260801-modaneringo": {
    tags: ["original"],
  },
};

export const WORK_TAGS: { id: WorkTag; label: string }[] = [
  {
    id: "original",
    label: "オリジナル",
  },
  {
    id: "fanart",
    label: "ファンアート",
  },
  {
    id: "parody",
    label: "パロディ",
  },
  {
    id: "flipnote-studio",
    label: "うごくメモ帳",
  },
  {
    id: "axnos-paint",
    label: "AXNOS Paint",
  },
  {
    id: "analog",
    label: "アナログ / 現物",
  },
  {
    id: "engineering",
    label: "エンジニアリング",
  },
] as const;
