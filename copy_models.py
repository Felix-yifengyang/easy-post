import os
import shutil
from pathlib import Path

def copy_models(source_dir, target_dir, model_name, num_copies):
    """
    复制模型文件并重命名
    
    参数:
        source_dir: 源目录路径
        target_dir: 目标目录路径 
        model_name: 模型文件名(带扩展名)
        num_copies: 要复制的数量
    """
    source_path = Path(source_dir) / model_name
    if not source_path.exists():
        print(f"错误: 源文件 {source_path} 不存在")
        return

    target_dir = Path(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    base_name = model_name.split('.')[0]
    extension = model_name.split('.')[1]

    for i in range(1, num_copies + 1):
        new_name = f"{base_name}_{i}.{extension}"
        target_path = target_dir / new_name
        shutil.copy2(source_path, target_path)
        print(f"已复制: {source_path} -> {target_path}")

if __name__ == "__main__":
    # 配置参数
    source_directory = "client/public/models"  # 源目录
    target_directory = "client/public/models_copies"  # 目标目录
    model_to_copy = "flowertest.glb"  # 要复制的模型文件
    copy_count = 100  # 复制数量

    # 执行复制
    copy_models(source_directory, target_directory, model_to_copy, copy_count)
    print(f"\n已完成 {copy_count} 个 {model_to_copy} 的复制")
