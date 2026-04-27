
export const REEL_BANDS = [
    ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
    ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
    ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
    ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
    ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
];

export const PAYTABLE = {
    "hv1": { 3: 10, 4: 20, 5: 50 },
    "hv2": { 3: 5,  4: 10, 5: 20 },
    "hv3": { 3: 5,  4: 10, 5: 15 },
    "hv4": { 3: 5,  4: 10, 5: 15 },
    "lv1": { 3: 2,  4: 5,  5: 10 },
    "lv2": { 3: 1,  4: 2,  5: 5 },
    "lv3": { 3: 1,  4: 2,  5: 3 },
    "lv4": { 3: 1,  4: 2,  5: 3 }
};

export const PAYLINES = [
    { id: 1, pattern: [1, 1, 1, 1, 1] }, 
    { id: 2, pattern: [0, 0, 0, 0, 0] }, 
    { id: 3, pattern: [2, 2, 2, 2, 2] }, 
    { id: 4, pattern: [0, 0, 1, 2, 2] }, 
    { id: 5, pattern: [2, 2, 1, 0, 0] }, 
    { id: 6, pattern: [0, 1, 2, 1, 0] }, 
    { id: 7, pattern: [2, 1, 0, 1, 2] }  
];