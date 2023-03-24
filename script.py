from PIL import Image
import os

# Set the path to the bandImages folder
folder_path = 'qrCodes'

# Create a list of all PNG files in the folder
png_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

# Sort the files alphabetically
png_files.sort()

# Create an empty list to store the images
images = []

# Set the maximum number of images to stack
max_images = 12

# Set the output folder path
output_folder = 'OUTPUT'

# Set the output file name template
output_file_template = 'output{}.png'

# Loop through the files and open each one using PIL
for i, file in enumerate(png_files):
    file_path = os.path.join(folder_path, file)
    img = Image.open(file_path)
    images.append(img)

    # If we've reached the maximum number of images to stack or the end of the list,
    # create a new stacked image and save it to the output folder
    if len(images) == max_images or i == len(png_files) - 1:
        # Get the width and height of the first image
        width, height = images[0].size

        # Create a new image with the same width and the height of all images combined
        new_image = Image.new('RGB', (width, height * len(images)))

        # Loop through the images and paste them one after the other
        for j, img in enumerate(images):
            new_image.paste(img, (0, j * height))

        # Generate the output file name
        output_file_path = os.path.join(
            output_folder, output_file_template.format(i // max_images + 1))

        # Save the new image
        new_image.save(output_file_path)

        # Clear the images list
        images.clear()
