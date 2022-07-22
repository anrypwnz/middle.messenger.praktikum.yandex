import EventBus from './EventBus'
import {nanoid} from 'nanoid'

interface BlockMeta<P = any> {
    tagName: string
    props: P
}

export default class Block<Props extends Record<string, unknown>> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const

    protected id = nanoid()
    private readonly _meta: BlockMeta
    protected _element: Element
    protected readonly props: Props
    eventBus: () => EventBus

    protected constructor(tagName: string, props?: Props) {
        const eventBus = new EventBus()

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy({...props, id: this.id || {} as Props
    })
        this.eventBus = () => eventBus
        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _createResources() {
        const {tagName} = this._meta
        this._element = this._createDocumentElement(tagName)
    }

    init(): void {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    private _componentDidMount() {
        this.componentDidMount()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    componentDidMount(): boolean {
        return true
    }

    private _componentDidUpdate(oldProps:Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        }
    }

    public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return oldProps !== newProps;
    }

    public setProps = (nextProps: Props): void | Record<string, unknown> => {
        if (!nextProps) {
            return
        }
        return Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element
    }

    private _render() {
        const fragment = this.render();

        this._removeEvents()
        this._element!.innerHTML = ''

        this._element?.appendChild(fragment)
        this._addEvents()
    }

    protected render(): DocumentFragment {
        return new DocumentFragment()
    }

    getContent(): HTMLElement {
        return this.element as HTMLElement
    }

    private _makePropsProxy(props: any) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set(target, prop, value) {
                target[prop] = value

                this.eventBus?.emit(Block.EVENTS.FLOW_CDU, {...target}, target)
                return true
            },
            deleteProperty() {
                throw new Error('Нет доступа')
            }
        });
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events

        if (!events || !this._element) {
            return
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element?.removeEventListener(event, listener)
        })
    }

    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events

        if (!events) {
            return
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element?.addEventListener(event, listener)
        })
    }

    private _createDocumentElement(tagName: string): Element {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this.id);
        return element;
    }

    show(): void {
        this.getContent().style.display = 'block'
    }

    hide(): void {
        this.getContent().style.display = 'none'
    }
}
