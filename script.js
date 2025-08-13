// 语言翻译数据
const translations = {
    zh: {
        title: '图片压缩工具',
        subtitle: '为中小学生、老师和家长专门研发的免费图片批量压缩工具，访问 <span class="highlight">yasuo.photos</span> 随时使用！',
        feature1: '<strong>批量处理：</strong>一次性压缩多张图片，节省宝贵时间',
        feature2: '<strong>简单易用：</strong>拖拽上传，一键下载，无需专业知识',
        feature3: '<strong>完全免费：</strong>无需注册，无广告，无隐藏收费',
        feature4: '<strong>教育助手：</strong>轻松压缩作业、教案、学习资料中的图片',
        uploadText: '点击或拖拽图片到这里',
        uploadSubtext: '支持 PNG、JPG 格式，可选择多张图片',
        prevBtn: '上一张',
        nextBtn: '下一张',
        originalImage: '原始图片',
        compressedImage: '压缩后',
        fileSize: '文件大小：',
        totalOriginalSizeLabel: '原始总大小：',
        totalCompressedSizeLabel: '压缩后总大小：',
        totalSavingsLabel: '节省：',
        compressionLevel: '压缩程度：',
        qualityNote: '（JPG: 调整压缩质量 / PNG: 调整图片尺寸）',
        downloadCurrent: '下载当前图片',
        downloadAll: '下载所有图片',
        clearAll: '删除所有图片',
        footerText1: '记住我们的网址：<strong>yasuo.photos</strong> - 随时随地为您提供免费图片压缩服务',
        footerText2: '© 2023-2024 yasuo.photos - 让图片压缩更简单',
        privacyPolicy: '隐私政策',
        termsOfService: '服务条款',
        aboutUs: '关于我们',
        processing: '处理中...',
        savings: '节省',
        increase: '增加'
    },
    en: {
        title: 'Image Compression Tool',
        subtitle: 'Free batch image compression tool specially developed for students, teachers and parents. Visit <span class="highlight">yasuo.photos</span> anytime!',
        feature1: '<strong>Batch Processing:</strong> Compress multiple images at once, saving valuable time',
        feature2: '<strong>Easy to Use:</strong> Drag and drop upload, one-click download, no expertise required',
        feature3: '<strong>Completely Free:</strong> No registration, no ads, no hidden fees',
        feature4: '<strong>Education Helper:</strong> Easily compress images in homework, lesson plans, and study materials',
        uploadText: 'Click or drag images here',
        uploadSubtext: 'Supports PNG, JPG formats, multiple images allowed',
        prevBtn: 'Previous',
        nextBtn: 'Next',
        originalImage: 'Original Image',
        compressedImage: 'Compressed',
        fileSize: 'File Size: ',
        totalOriginalSizeLabel: 'Total Original Size: ',
        totalCompressedSizeLabel: 'Total Compressed Size: ',
        totalSavingsLabel: 'Saved: ',
        compressionLevel: 'Compression Level: ',
        qualityNote: '(JPG: Adjust compression quality / PNG: Adjust image dimensions)',
        downloadCurrent: 'Download Current Image',
        downloadAll: 'Download All Images',
        clearAll: 'Clear All Images',
        footerText1: 'Remember our URL: <strong>yasuo.photos</strong> - Free image compression service anytime, anywhere',
        footerText2: '© 2023-2024 yasuo.photos - Making image compression easier',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        aboutUs: 'About Us',
        processing: 'Processing...',
        savings: 'saved',
        increase: 'increase'
    }
};

// 当前语言
let currentLanguage = localStorage.getItem('language') || 'en';

// 语言切换功能
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // 更新HTML lang属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
    // 更新页面标题
    document.title = lang === 'zh' ? '图片压缩工具 - yasuo.photos' : 'Image Compression Tool - yasuo.photos';
    
    // 更新所有翻译元素
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // 更新语言按钮
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = lang === 'zh' ? 'EN' : '中文';
    langBtn.setAttribute('data-lang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言
    switchLanguage(currentLanguage);
    
    // 语言切换按钮事件
    const langBtn = document.getElementById('langBtn');
    langBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
        switchLanguage(newLang);
    });

    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const originalPreview = document.getElementById('originalPreview');
    const compressedPreview = document.getElementById('compressedPreview');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');
    const multiImagesContainer = document.getElementById('multiImagesContainer');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const imageNavigation = document.getElementById('imageNavigation');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const imageCounter = document.getElementById('imageCounter');
    const totalSizeInfo = document.getElementById('totalSizeInfo');
    const totalOriginalSize = document.getElementById('totalOriginalSize');
    const totalCompressedSize = document.getElementById('totalCompressedSize');
    const totalSavings = document.getElementById('totalSavings');

    let originalFile = null;
    let compressedImages = []; // 存储所有压缩后的图片
    let allImages = []; // 存储所有图片信息
    let currentImageIndex = 0; // 当前显示的图片索引
    let currentQuality = 0.8; // 当前压缩质量，默认80%

    // 上传区域点击事件
    uploadArea.addEventListener('click', () => fileInput.click());

    // 文件拖拽事件
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#007AFF';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#E5E5E5';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#E5E5E5';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFiles(files);
        }
    });

    // 文件选择事件
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            processFiles(files);
        }
    });

    // 处理多个文件
    function processFiles(files) {
        // 重置状态
        allImages = [];
        compressedImages = [];
        currentImageIndex = 0;
        multiImagesContainer.innerHTML = '';
        
        // 获取当前质量设置
        currentQuality = qualitySlider.value / 100;
        
        // 处理每个文件
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file && file.type.match('image.*')) {
                // 将文件加入数组
                allImages.push({
                    file: file,
                    originalSize: file.size,
                    name: file.name,
                    type: file.type
                });
            }
        }
        
        // 显示导航控件和总大小信息
        if (allImages.length > 1) {
            imageNavigation.style.display = 'flex';
            totalSizeInfo.style.display = 'block';
            downloadAllBtn.style.display = 'block';
            updateImageCounter();
            updateTotalSizeInfo();
        } else if (allImages.length === 1) {
            imageNavigation.style.display = 'none';
            totalSizeInfo.style.display = 'none';
            downloadAllBtn.style.display = 'none';
        } else {
            imageNavigation.style.display = 'none';
            totalSizeInfo.style.display = 'none';
            downloadAllBtn.style.display = 'none';
            return; // 没有图片，退出处理
        }
        
        // 立即开始处理所有图片
        processAllImages();
        
        // 加载第一张图片到界面
        loadImageAtIndex(0);
        previewContainer.style.display = 'block';
    }
    
    // 处理所有图片的压缩
    function processAllImages() {
        // 遍历所有图片，开始压缩
        allImages.forEach((imageInfo, index) => {
            // 开始读取和压缩图片
            const reader = new FileReader();
            reader.onload = (e) => {
                // 保存原始图片数据
                allImages[index].originalImageData = e.target.result;
                
                // 开始压缩
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    
                    // 根据文件类型使用不同的压缩策略
                    if (imageInfo.type === 'image/jpeg') {
                        // JPEG使用quality参数
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            // 保存压缩结果
                            saveCompressedImage(blob, index, imageInfo.name);
                        }, 'image/jpeg', currentQuality);
                    } else if (imageInfo.type === 'image/png') {
                        // PNG通过调整尺寸来压缩
                        // 根据quality值计算压缩比例
                        const scale = 0.5 + (currentQuality * 0.5); // quality从0到1,scale从0.5到1
                        canvas.width = img.width * scale;
                        canvas.height = img.height * scale;
                        
                        const ctx = canvas.getContext('2d');
                        // 设置图像平滑度
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = currentQuality < 0.5 ? 'low' : currentQuality < 0.8 ? 'medium' : 'high';
                        
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob((blob) => {
                            // 保存压缩结果
                            saveCompressedImage(blob, index, imageInfo.name);
                        }, 'image/png');
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(imageInfo.file);
        });
    }
    
    // 保存压缩后的图片
    function saveCompressedImage(blob, index, fileName) {
        // 存储压缩后的图片信息
        compressedImages[index] = {
            blob: blob,
            name: fileName,
            size: blob.size
        };
        
        // 如果是当前显示的图片，更新预览
        if (index === currentImageIndex) {
            compressedPreview.src = URL.createObjectURL(blob);
            compressedSize.textContent = formatFileSize(blob.size);
            
            // 设置下载按钮
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `compressed_${fileName}`;
                link.click();
            };
        }
        
        // 更新总大小信息
        updateTotalSizeInfo();
    }
    
    // 更新图片计数器显示
    function updateImageCounter() {
        if (allImages.length > 0) {
            imageCounter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
        } else {
            imageCounter.textContent = '0 / 0';
        }
    }
    
    // 更新总大小信息
    function updateTotalSizeInfo() {
        if (allImages.length === 0) return;
        
        // 计算原始总大小
        let originalTotal = 0;
        allImages.forEach(img => {
            originalTotal += img.originalSize || 0;
        });
        
        // 计算压缩后总大小
        let compressedTotal = 0;
        let compressedCount = 0;
        
        compressedImages.forEach(img => {
            if (img && img.size) {
                compressedTotal += img.size;
                compressedCount++;
            }
        });
        
        // 更新显示
        totalOriginalSize.textContent = formatFileSize(originalTotal);
        
        // 如果所有图片都已压缩
        if (compressedCount === allImages.length) {
            totalCompressedSize.textContent = formatFileSize(compressedTotal);
            
            // 计算节省的大小和百分比
            const savedBytes = originalTotal - compressedTotal;
            const savedPercent = originalTotal > 0 ? 
                Math.round((savedBytes / originalTotal) * 100) : 0;
            
            // 根据节省情况设置颜色
            if (savedBytes > 0) {
                totalSavings.textContent = `${formatFileSize(savedBytes)} (${savedPercent}%)`;
                totalSavings.style.color = '#34C759'; // 绿色表示节省
            } else {
                // 负的节省意味着文件变大了
                totalSavings.textContent = `${formatFileSize(Math.abs(savedBytes))} (${Math.abs(savedPercent)}% ${translations[currentLanguage].increase})`;
                totalSavings.style.color = '#FF3B30'; // 红色表示增加
            }
        } else if (compressedCount > 0) {
            // 至少有一些图片已经压缩完成，显示部分结果
            totalCompressedSize.textContent = `${formatFileSize(compressedTotal)} (${compressedCount}/${allImages.length}张已处理)`;
            totalSavings.textContent = translations[currentLanguage].processing;
            totalSavings.style.color = '#86868B'; // 灰色表示处理中
        } else {
            totalCompressedSize.textContent = translations[currentLanguage].processing;
            totalSavings.textContent = translations[currentLanguage].processing;
            totalSavings.style.color = '#86868B'; // 灰色表示处理中
        }
    }
    
    // 上一张图片按钮
    prevImageBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            loadImageAtIndex(currentImageIndex);
        }
    });
    
    // 下一张图片按钮
    nextImageBtn.addEventListener('click', () => {
        if (currentImageIndex < allImages.length - 1) {
            currentImageIndex++;
            loadImageAtIndex(currentImageIndex);
        }
    });
    
    // 加载指定索引的图片
    function loadImageAtIndex(index) {
        if (index < 0 || index >= allImages.length) return;
        
        currentImageIndex = index;
        const imageInfo = allImages[index];
        originalFile = imageInfo.file;
        
        // 更新图片计数器
        updateImageCounter();
        
        // 更新图片预览
        originalSize.textContent = formatFileSize(imageInfo.originalSize);
        
        // 显示原始图片
        if (imageInfo.originalImageData) {
            originalPreview.src = imageInfo.originalImageData;
        } else {
            // 如果没有缓存的原始图片数据，就重新读取
            const reader = new FileReader();
            reader.onload = (e) => {
                originalPreview.src = e.target.result;
                imageInfo.originalImageData = e.target.result;
            };
            reader.readAsDataURL(imageInfo.file);
        }
        
        // 启用/禁用导航按钮
        prevImageBtn.disabled = (currentImageIndex === 0);
        nextImageBtn.disabled = (currentImageIndex === allImages.length - 1);
        
        // 如果已有压缩后的图片，显示它
        if (compressedImages[currentImageIndex] && compressedImages[currentImageIndex].blob) {
            compressedPreview.src = URL.createObjectURL(compressedImages[currentImageIndex].blob);
            compressedSize.textContent = formatFileSize(compressedImages[currentImageIndex].size);
            
            // 设置下载按钮
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(compressedImages[currentImageIndex].blob);
                link.download = `compressed_${imageInfo.name}`;
                link.click();
            };
        } else {
            compressedPreview.src = '';
            compressedSize.textContent = translations[currentLanguage].processing;
        }
    }

    // 质量滑块事件
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = `${e.target.value}%`;
        currentQuality = e.target.value / 100;
        
        // 清除所有压缩结果，准备重新压缩
        compressedImages.forEach((img, index) => {
            if (img && img.blob) {
                URL.revokeObjectURL(img.blob);
            }
        });
        
        // 清空压缩结果数组
        compressedImages = [];
        
        // 重新处理所有图片
        processAllImages();
        
        // 更新当前图片的界面
        updateTotalSizeInfo();
    });

    // 下载所有压缩后的图片
    downloadAllBtn.addEventListener('click', () => {
        if (compressedImages.length === 0) return;
        
        // 如果只有一张图片，直接下载
        if (compressedImages.length === 1 && compressedImages[0]) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(compressedImages[0].blob);
            link.download = `compressed_${compressedImages[0].name}`;
            link.click();
            return;
        }
        
        // 多张图片时，创建ZIP文件
        if (typeof JSZip === 'undefined') {
            // 如果没有加载JSZip库，先加载
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = createZipAndDownload;
            document.head.appendChild(script);
        } else {
            createZipAndDownload();
        }
    });
    
    // 创建ZIP并下载
    function createZipAndDownload() {
        const zip = new JSZip();
        let count = 0;
        
        compressedImages.forEach((image, index) => {
            if (image && image.blob) {
                zip.file(`compressed_${image.name}`, image.blob);
                count++;
            }
        });
        
        if (count === 0) return;
        
        zip.generateAsync({type: 'blob'}).then(function(content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'compressed_images.zip';
            link.click();
        });
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 下载所有图片为zip
    downloadAllBtn.addEventListener('click', createZipAndDownload);
    
    // 删除所有图片
    clearAllBtn.addEventListener('click', clearAllImages);
    
    // 清除所有图片函数
    function clearAllImages() {
        // 重置状态
        allImages = [];
        compressedImages = [];
        currentImageIndex = 0;
        
        // 清除预览
        originalPreview.src = '';
        compressedPreview.src = '';
        originalSize.textContent = '0 KB';
        compressedSize.textContent = '0 KB';
        
        // 重置文件输入框
        fileInput.value = '';
        
        // 隐藏预览容器
        previewContainer.style.display = 'none';
        
        // 重置多图片容器
        multiImagesContainer.innerHTML = '';
        
        // 隐藏导航控件和总大小信息
        imageNavigation.style.display = 'none';
        totalSizeInfo.style.display = 'none';
        downloadAllBtn.style.display = 'none';
    }
}); 