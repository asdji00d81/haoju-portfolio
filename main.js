// 年份
document.getElementById('year').textContent = new Date().getFullYear();

const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.page-section');
let currentId = 'about';

// ===== 分頁切換＋淡入 =====
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    if (targetId === currentId) return;

    const currentSection = document.getElementById(currentId);
    const targetSection = document.getElementById(targetId);

    currentSection.classList.remove('active');

    setTimeout(() => {
      currentSection.style.display = 'none';

      targetSection.style.display = 'block';
      void targetSection.offsetWidth;
      targetSection.classList.add('active');

      currentId = targetId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  });
});

// 第一次載入：讓 about 淡入
sections.forEach(sec => {
  sec.style.display = 'none';
  sec.classList.remove('active');
});

window.addEventListener('load', () => {
  const first = document.getElementById('about');
  if (first) {
    first.style.display = 'block';
    void first.offsetWidth;
    first.classList.add('active');
    currentId = 'about';
  }
});

// ===== 所有作品詳細內容資料 =====
const PROJECTS = {
  underwater: {
    title: '應用動態分割於水下音頻辨識',
    meta: 'Thesis · Underwater Audio · 2023/9 ~ 2025/7',
    image: 'project/vad.png',
    tech: 'Python, PyTorch, Librosa, CNN‑LSTM, MobileNetV3',
    sections: [
      {
        heading: '研究動機',
        body: `
        
        <p>水下聲音辨識在海洋生態監測、海洋哺乳類行為分析與人為噪音污染評估中扮演關鍵角色，可協助掌握物種活動範圍、行為模式，並作為海洋保育與相關政策制定的重要依據。 然而，實際環境中的辨識效果常受到海流、氣泡、降雨等背景噪音，以及溫度、鹽度與水壓變化造成的聲音傳播失真所影響，導致模型穩定性與泛化能力不足。</p>
        <p>傳統多以固定時間窗切割與單一類型特徵（例如一維時間特徵或二維頻譜特徵）進行訓練，容易出現無法同時兼顧時間與頻率變化、切不到完整事件或誤切片段的問題，在高噪音、低訊號的水下環境中更易造成誤判。 部分雖引入深度學習模型，但在噪音干擾嚴重或計算資源受限的情境下，仍難以兼顧辨識效能與實際部署需求</p>。
        `
        
      },
      {
        heading: '方法與系統架構',
        body:  `
         <div style="text-align:center; margin-bottom:16px;">
         <img src="project/water/flow.jpg"
         alt="實驗流程圖"
         style="max-width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="font-size:12px; color:#888; margin-top:8px;">實驗流程圖</p>
      </div>

        <p><p>本研究以長時間水下錄音為輸入，首先進行資料切分與動態分割，處理不同音檔長度與連續背景段落等問題。 在 VAD 區塊中，透過特徵比例與分層處理選出關鍵聲學特徵，將時域與頻域的多維特徵向量輸入 CNN‑LSTM 模型，以判斷各片段是否包含有效發聲事件。 通過 VAD 的有效片段會被統一縮放至 3 秒長度並轉換為 log‑Mel 圖像，最後交由 MobileNetV3 進行物種分類，輸出對應的海洋哺乳類類別標籤。</p>

        <div style="display:flex; gap:16px; margin:20px 0; flex-wrap:wrap;">
        <div style="flex:1 1 260px;">
        <img src="project/water/1D.jpg"
           alt="標量特徵融合"
           style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">標量特徵融合</p>
      </div>
        <div style="flex:1 1 260px;">
        <img src="project/water/2D.jpg"
           alt="頻譜相關特徵融合"
           style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">頻譜相關特徵融合</p>
      </div>
    </div>
        
        <p>在特徵設計上，本研究同時使用一維與二維聲學特徵來描述水下聲音的時間與頻率變化。 一維部分透過短時間能量（STE）與零交叉率（ZCR）量化每一幀的能量起伏與頻率粗略分布，並整理成時間序列熱力圖輸入 VAD 模型。二維部分則整合 log‑Mel 頻譜圖、MFCC 與頻譜統計特徵，將多種頻域資訊串接為單一特徵圖，使 CNN‑LSTM 能在同一張圖上同時學習時間–頻率模式與頻譜形狀差異。</p>

        `
      },
      {
        heading: '結果',
        body: `
        <div style="text-align:center; margin-bottom:16px;">
        <img src="project/water/VAD.jpg"
        alt="Materials"
        style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">VAD實驗結果</p>
      </div>
        <p>在聲音活動偵測任務中，本研究比較不同特徵組合與模型架構，結果顯示結合自訂多維聲學特徵的 CNN‑LSTM 在 VAD 任務表現最佳。如表中所示，Our Feature + CNN‑LSTM 能達到 Precision 91.51%、Recall 89.57%、F1-score 90.15 與 AUC 94.85，整體優於僅使用 log-Mel 或傳統 DFT+MFCC 特徵的各種基準模型，證明動態分割與多特徵設計有助於提升水下發聲事件偵測的穩定性與準確度。</p>

        <div style="text-align:center; margin-bottom:16px;">
        <img src="project/water/MobileNet.jpg"
        alt="Materials"
        style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">MobileNet分類結果</p>
      </div>
        <p>在物種分類任務中，本研究比較 MobileNet 系列在「原始長度」與「3 秒標準化」兩種輸入設定下的表現，結果顯示 MobileNetV3-large 在兩種情況皆維持最佳效能。在 3 秒版本中，其 Precision、Recall 與 F1-score 分別達 96.44%、96.02% 與 95.93，而 MobileNetV2 與 MobileNetV3-small 亦能維持約 95% 的 F1-score，顯示這些成熟架構對輸入長度變化具有良好適應性。</p>
        <p>整體而言，多數模型在 3 秒標準化設定下的表現優於原始長度，特別是結構較簡單的 MobileNetV1 與 MobileNetV3-small，F1-score 分別提升約 2.8 與 1.4 個百分點，突顯統一時間維度有助於模型學習穩定的時間–頻率模式。相較之下，MobileNetV4 系列雖為較新架構，但在本研究資料集上的 F1-score 約落在 90%–92% 區間，整體仍不及 MobileNetV3-large，推測與其較高的模型複雜度與資料量限制有關。</p>

      `
      },
      {
        heading: '結果呈現',
        body: `
          <!-- VAD 視覺化 -->
          <div style="display:flex; gap:16px; margin:20px 0; flex-wrap:wrap;">
            <div style="flex:1 1 260px;">
              <img src="project/water/VADtest1.jpg"
                   alt="VAD 測試結果範例一"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
            <div style="flex:1 1 260px;">
              <img src="project/water/VADtest2.jpg"
                   alt="VAD 測試結果範例二"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
          </div>
          <p style="text-align:center; font-size:12px; color:#888; margin-top:-8px; margin-bottom:16px;">
            VAD 測試結果：展示在長音訊中偵測出有效發聲區段的情形
          </p>

          <!-- 分類結果可視化 -->
          <div style="display:flex; gap:16px; margin:20px 0; flex-wrap:wrap;">
            <div style="flex:1 1 260px;">
              <img src="project/water/class1.jpg"
                   alt="分類結果範例一"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
            <div style="flex:1 1 260px;">
              <img src="project/water/class2.jpg"
                   alt="分類結果範例二"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
          </div>
          <p style="text-align:center; font-size:12px; color:#888; margin-top:-8px; margin-bottom:16px;">
            分類測試結果：示意偵測到多段發聲後，對各片段進行物種分類的狀況
          </p>

          <!-- 分類示範影片 -->
          <video style="width:100%; max-width:480px; border-radius:8px; margin:20px auto; display:block; border:1px solid #e0e0e0;" controls>
            <source src="project/water/classvideo.mp4" type="video/mp4">
            你的瀏覽器不支援影片播放
          </video>
          <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">
            分類測試影片：以 Humpback Whale 為例，展示偵測與分類流程
          </p>
        `
      }
    ]
  },
  pcb: {
    title: '基於深度學習的 PCB 板分類應用',
    meta: 'Computer Vision · 2022/3 ~ 2023/3',
    image: 'project/pcb.png',
    tech: 'Python, TensorFlow, Keras, OpenCV, CNN',
    sections: [
      {
        heading: '動機',
        body: `
        印刷電路板（PCB）是各式電子產品中最關鍵的基板，只要板上元件裝配錯誤或焊接缺陷，就可能導致整機異常，因此生產過程中的缺陷檢測是品質管控的重要環節。[file:114] 傳統 AOI 結合人工覆判的檢測流程，不僅設備成本高、人工訓練時間長，且容易因光影變化與長時間作業導致誤判與過檢。本專題希望透過深度學習建置 PCB 影像分類模型，先自動判斷元件類型，作為後續瑕疵分類與 AI 覆判系統的基礎。
        `


      },
      {
        heading: '方法流程',
          body: `
          <!-- VAD 視覺化 -->
          <div style="display:flex; gap:16px; margin:20px 0; flex-wrap:wrap;">
            <div style="flex:1 1 260px;">
              <img src="project/pcb/pcb_flow.jpg"
                   alt="VAD 測試範例一"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
            <div style="flex:1 1 260px;">
              <img src="project/pcb/vgg19.jpg"
                   alt="VAD 測試範例二"
                   style="width:100%; height:auto; border-radius:8px; border:1px solid #e0e0e0;">
            </div>
          </div>
        <p>本專題以 AOI 機台輸出的元件影像為輸入，先依元件類型整理並建立多類別資料集，包含缺件、翻件、短路等多種情境。[file:114] 影像經由尺寸標準化、對比度調整與資料增強後，輸入以 VGG19 為基底的卷積神經網路，利用遷移學習方式微調最後幾層全連接層，以適應 PCB 元件分類任務。[file:114] 為提升泛化能力，訓練過程搭配資料隨機打亂、學習率控制與早停策略，避免過擬合並穩定收斂。`
},
      {
          heading: '結果',
          body: `
        <div style="text-align:center; margin-bottom:16px;">
        <img src="project/pcb/result1.jpg"
        alt="result1"
        style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">五次訓練曲線圖</p>
      </div>

        <p>在 PCB 元件分類實驗中，模型經過五次獨立訓練與測試，訓練準確率皆能穩定收斂至 100%，測試準確率則介於 99.62% 至 99.87% 之間，顯示模型在不同訓練次數下皆能維持高度且穩定的辨識能力。從訓練曲線可以看到，訓練與驗證準確率在早期 epoch 即快速上升並趨於重合，代表過程中沒有明顯過擬合，模型對未看過的測試影像仍具有良好的泛化表現。</p>

        <div style="text-align:center; margin-bottom:16px;">
        <img src="project/pcb/result2.jpg"
        alt="result2"
        style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">結果表格</p>
      </div>
        <p>整體而言，此深度學習分類模型能有效區分不同類型的 PCB 元件，為後續導入實際 AOI 覆判流程、進一步進行瑕疵類型判斷奠定良好基礎。</p>

          `
      
      },
    ]
  },
traffic: {
  title: '紅綠燈檢測系統',
  meta: 'Object Detection · 2022/3 ~ 2022/6',
  image: 'project/light.png',
  tech: 'Python, YOLOv5, OpenCV, PyTorch',
  sections: [
    {
      heading: '動機',
      body: `
        在智慧交通應用中，系統需要正確判斷紅綠燈狀態，才能輔助駕駛或自駕車做出安全決策。這個專題希望用 YOLOv5 建立一個簡單的紅綠燈偵測模型，實作從資料蒐集與標註到模型訓練與測試的流程，了解目標偵測在實際道路場景中的效果與限制。
      `
    },
    {
      heading: '方法流程',
      body: `
        使用 YOLOv5 預訓練模型進行遷移學習，自建交通場景數據集並標註紅綠燈狀態後進行訓練；沿用 YOLOv5 內建的資料增強與訓練流程，搭配重新設定的 anchor box 與參數微調，提升對小尺寸交通號誌的偵測表現。
      `
    },
    {
      heading: '結果',
      body: `
        在自建數據集上 mAP@0.5 約為 92.8%，在一般日間場景下可達到穩定的即時檢測效果，推論速度約 85 FPS，適合部署於 GPU 環境下的即時應用。於夜間與陰雨等惡劣天候條件中，經過資料增強與參數微調後，仍能維持 88% 以上的整體偵測準確率，達到實務上可接受的表現水準。
      `
    },
    {
      heading: '結果呈現',
      body: `
        <div style="text-align:center; margin-bottom:16px;">
        <img src="project/light/result.jpg"
        alt="Materials"
        style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
        <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">result</p>
      </div>
        <div style="display:flex; gap:16px; margin-bottom:20px;">
        <div style="flex:1;">
        <img src="project/light/test1.jpg" alt="hardware circuit" style="width:100%; border-radius:8px; border:1px solid #e0e0e0;">
      </div>
        <div style="flex:1;">
        <img src="project/light/test2.jpg" alt="flowchart" style="width:100%; border-radius:8px; border:1px solid #e0e0e0;">
      </div>
        
      </div>

        透過疊加檢測框與信心分數的輸出影像，觀察模型在不同距離與角度下的辨識情況，並以混淆矩陣與 PR 曲線分析各燈號類別的偵測表現。此外，也對比不同設定下的訓練曲線與推論結果，以調整最佳參數組合。<br><br>
        更完整的實作流程與訓練細節，可參考個人技術文章：<br>


        
        <a href="https://medium.com/@asdji00d81/using-yolov5-to-train-a-simple-traffic-light-recognition-module-6466a74eb433"
           target="_blank"
           style="color:#4a6ee0; text-decoration:none;">
          Using YOLOv5 to train a simple traffic light recognition module
        </a>
      `
    }
  ]
},
car: {
  title: 'Arduino 超音波避障自走車',
  meta: 'Embedded System · 2021/10 ~ 2022/1',
  image: 'project/car.png',
  tech: 'Arduino, C, HC-SR04, Servo Motor',
  sections: [
    {
      heading: '動機',
      body: '在自駕車、機器人導航等領域，實時環境感知與自主決策是核心技術。本專案旨在設計一台 Arduino 控制的超音波避障自走車，深入理解感測器融合、即時決策邏輯、嵌入式系統設計與硬體整合等關鍵概念。透過實作超音波量測、伺服馬達掃描與多馬達驅動控制，從零建立一套可穩定運作的避障平台，不僅驗證課堂上學到的控制與感測理論，也累積日後開發更大型移動機器人所需的實務經驗。藉由觀察車體在不同障礙場景下的行為與調參過程，培養對路徑規劃與安全冗餘設計的直覺，為後續自駕車、無人機與智慧交通等更複雜系統的開發奠定基礎。'
    },
  {
    heading: '材料',
    body: `
     <div style="text-align:center; margin-bottom:16px;">
     <img src="project/car/car_materials.jpg"
           alt="Materials"
           style="max-width:100%; border-radius:8px; border:1px solid #e0e0e0;">
    </div>
    <ul style="line-height:1.8; margin-left:20px;">
      <li>Transmission line ×1</li>
      <li>Foam tape ×1</li>
      <li>Arduino UNO ×1</li>
      <li>HC-SR04 超音波感測器 ×1</li>
      <li>Servo motor ×1</li>
      <li>Pearl board ×3</li>
      <li>Wheel ×4</li>
      <li>Gear motor ×4</li>
      <li>L293D 馬達驅動 IC ×2</li>
    </ul>
  `
  },
    {
    heading: '方法與系統架構',
    body: `
      <div style="display:flex; gap:16px; margin-bottom:20px;">
        <div style="flex:1;">
          <img src="project/car/car_circuit.png" alt="hardware circuit" style="width:100%; border-radius:8px; border:1px solid #e0e0e0;">
          <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">硬體佈線圖</p>
        </div>
        <div style="flex:1;">
          <img src="project/car/car_flowchart.png" alt="flowchart" style="width:100%; border-radius:8px; border:1px solid #e0e0e0;">
          <p style="text-align:center; font-size:12px; color:#888; margin-top:8px;">避障邏輯流程圖</p>
        </div>
      </div>
      
      <p>使用 HC-SR04 超音波感測器進行 180° 環保境掃描；伺服馬達控制感測器旋轉以獲取全向距離數據；Arduino 負責多感測器資料融合與路徑規劃決策；四輪獨立馬達驅動實現差速轉向，使車體能平滑改變方向。感測周期約 100ms，決策延遲控制在 50ms 以內，確保實時反應。</p>
    `
    },
{
  heading: '結果呈現',
  body: `
  <video width="100%"   style="width:100%; max-width:480px; border-radius:8px; margin:20px auto; display:block; border:1px solid #e0e0e0;" controls>
    <source src="project/car/Final.mp4" type="video/mp4">
    你的瀏覽器不支援影片播放
  </video>
  `
}
  ]
}

};

// ===== 作品集詳細動畫 =====
const projectList = document.getElementById('project-list');
const projectDetail = document.getElementById('project-detail');
const detailBackBtn = document.getElementById('project-detail-back');

// 渲染詳細內容
function renderProjectDetail(projectKey) {
  const data = PROJECTS[projectKey];
  if (!data) return;

  const titleEl = document.getElementById('detail-title');
  const metaEl = document.getElementById('detail-meta');
  const imgEl = document.getElementById('detail-image');
  const techEl = document.getElementById('detail-tech');
  const bodyEl = document.getElementById('detail-body');

  if (titleEl) titleEl.textContent = data.title;
  if (metaEl) metaEl.textContent = data.meta;
  if (imgEl) {
    imgEl.src = data.image || '';
    imgEl.alt = data.title || '';
  }
  if (techEl) techEl.innerHTML = `<strong>Tech stack：</strong> ${data.tech}`;

  if (bodyEl) {
    bodyEl.innerHTML = '';
    data.sections.forEach(sec => {
      const h3 = document.createElement('h3');
      h3.textContent = sec.heading;

      const div = document.createElement('div');
      div.innerHTML = sec.body;
      div.style.marginBottom = '16px';
      div.style.lineHeight = '1.7';

      bodyEl.appendChild(h3);
      bodyEl.appendChild(div);
    });
  }
}

// 點擊作品卡片：顯示詳細內容
if (projectList && projectDetail) {
  projectList.addEventListener('click', (e) => {
    const card = e.target.closest('.proj-card');
    if (!card || !projectList.contains(card)) return;

    const key = card.getAttribute('data-project');
    if (!key) return;

    // 【關鍵修正】先重置詳細頁狀態，確保乾淨開始
    projectDetail.style.display = 'block';
    projectDetail.classList.remove('show'); // 先移除 show 類別
    void projectDetail.offsetWidth; // 觸發重繪

    // 渲染新內容
    renderProjectDetail(key);

    // 列表淡出
    projectList.classList.add('hidden');
    
    setTimeout(() => {
      projectList.style.display = 'none';
      
      // 詳細區塊淡入
      projectDetail.classList.add('show');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  });
}

// 返回按鈕：回到作品列表
if (detailBackBtn && projectDetail && projectList) {
  detailBackBtn.addEventListener('click', () => {
    // 詳細內容淡出
    projectDetail.classList.remove('show');
    
    setTimeout(() => {
      // 【關鍵修正】完全重置詳細頁狀態
      projectDetail.style.display = 'none';
      projectDetail.classList.remove('show');
      
      // 列表淡入
      projectList.style.display = 'grid';
      void projectList.offsetWidth;
      projectList.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 360);
  });
}

// ===== 粒子背景 =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1 + Math.random() * 2,
    });
  }
}

createParticles(90);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(120, 120, 140, 0.4)';
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= dx * 0.005;
        p.y -= dy * 0.005;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = 'rgba(120, 120, 140, 0.15)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
