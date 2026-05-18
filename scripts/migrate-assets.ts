import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

type RemoteAsset = {
  url: string;
  filename: string;
};

type LocalAsset = {
  source: string;
  filename: string;
};

type ProjectAssetManifest = {
  slug: string;
  remoteAssets?: RemoteAsset[];
  localAssets?: LocalAsset[];
  placeholder?: boolean;
};

const projectAssets: ProjectAssetManifest[] = [
  {
    slug: "uniseller",
    placeholder: true,
  },
  {
    slug: "vantage",
    placeholder: true,
  },
  {
    slug: "tethrai",
    placeholder: true,
  },
  {
    slug: "revoke",
    placeholder: true,
  },
  {
    slug: "tether-cold-light",
    placeholder: true,
  },
  {
    slug: "moneta-mobile",
    remoteAssets: [
      {
        url: "https://framerusercontent.com/images/uBVHtG1mY6BO7Rx0VtFkCcuzCg.jpg",
        filename: "cover.jpg",
      },
    ],
  },
  {
    slug: "moneta-web",
    remoteAssets: [
      {
        url: "https://framerusercontent.com/images/t5NhLulEeNj1Tt8jMnSiFctwcg.png",
        filename: "cover.png",
      },
    ],
  },
  {
    slug: "transaction-point",
    placeholder: true,
  },
  {
    slug: "uber-one-banking",
    localAssets: [
      {
        source: "public/projects/uber-banking/image 53.png",
        filename: "image-53.png",
      },
      {
        source: "public/projects/uber-banking/image 54.png",
        filename: "image-54.png",
      },
      {
        source: "public/projects/uber-banking/scene 35.jpg",
        filename: "scene-35.jpg",
      },
      {
        source: "public/projects/uber-banking/scene 37.jpg",
        filename: "scene-37.jpg",
      },
    ],
  },
  {
    slug: "fullrange-microfinance-bank",
    remoteAssets: [
      {
        url: "https://framerusercontent.com/images/ZPiXzTWulu7BKtsKuImab4qs0KI.jpg",
        filename: "cover.jpg",
      },
    ],
  },
  {
    slug: "fct-microfinance-bank",
    remoteAssets: [
      {
        url: "https://framerusercontent.com/images/9cydVRjEyUML9STVF5GtO6Zu8.jpg",
        filename: "cover.jpg",
      },
    ],
  },
  {
    slug: "bagis",
    placeholder: true,
  },
];

const publicProjectsDirectory = path.join(process.cwd(), "public", "projects");

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset(url: string, destination: string) {
  if (await fileExists(destination)) {
    console.log(`skip ${path.relative(process.cwd(), destination)}`);
    return;
  }

  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const asset = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, asset);

  console.log(`downloaded ${url}`);
}

function placeholderSvg(slug: string) {
  const title = slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${title} project media placeholder">
  <rect width="1600" height="900" fill="#09090b"/>
  <rect x="0.5" y="0.5" width="1599" height="899" fill="none" stroke="#27272a"/>
  <path d="M96 96H1504V804H96V96Z" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="800" y="456" fill="#71717a" font-family="Inter, Geist, Arial, sans-serif" font-size="22" text-anchor="middle" letter-spacing="3">MEDIA PENDING</text>
</svg>`;
}

async function migrateAssets() {
  for (const project of projectAssets) {
    const projectDirectory = path.join(publicProjectsDirectory, project.slug);
    await mkdir(projectDirectory, { recursive: true });

    for (const asset of project.remoteAssets ?? []) {
      await downloadAsset(asset.url, path.join(projectDirectory, asset.filename));
    }

    for (const asset of project.localAssets ?? []) {
      const source = path.join(process.cwd(), asset.source);
      const destination = path.join(projectDirectory, asset.filename);

      if (await fileExists(destination)) {
        console.log(`skip ${path.relative(process.cwd(), destination)}`);
        continue;
      }

      await copyFile(source, destination);
      console.log(`copied ${asset.source}`);
    }

    if (project.placeholder) {
      const destination = path.join(projectDirectory, "cover.svg");

      if (await fileExists(destination)) {
        console.log(`skip ${path.relative(process.cwd(), destination)}`);
        continue;
      }

      await writeFile(destination, placeholderSvg(project.slug), "utf8");
      console.log(`created ${path.relative(process.cwd(), destination)}`);
    }
  }
}

migrateAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
